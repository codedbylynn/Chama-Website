
import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Bell,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  FileText,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  Wallet,
  X,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import LandingPage from "./Pages/LandingPage";
import MembersPage from "./Pages/MembersPage";
import MemberDetailsPage from "./Pages/MemberDetailsPage";
import ContributionsPage from "./Pages/ContributionsPage";
import MemberDashboard from "./Pages/MemberDashboard";

import "./App.css";

/* --------------------------------------------------------------------------
   User
   -------------------------------------------------------------------------- */

const member = {
  fullName: "Lynn Gathoni",
  initials: "LG",
};

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */

type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

const navigation: NavItem[] = [
  { label: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
  { label: "Members", path: "/app/members", icon: Users },
  { label: "Contributions", path: "/app/contributions", icon: Wallet },
  { label: "Cycles & payouts", path: "/app/cycles", icon: CalendarDays },
  { label: "Payout approvals", path: "/app/payouts", icon: HandCoins },
  { label: "Financial ledger", path: "/app/ledger", icon: FileText },
];

const managementNavigation: NavItem[] = [
  { label: "Notifications", path: "/app/notifications", icon: Bell },
  { label: "Group settings", path: "/app/settings", icon: Settings },
];

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  members: "Members",
  contributions: "Contributions",
  cycles: "Cycles & payouts",
  payouts: "Payout approvals",
  ledger: "Financial ledger",
  notifications: "Notifications",
  settings: "Group settings",
  profile: "My profile",
};

const navClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? " active" : ""}`;

/* --------------------------------------------------------------------------
   Sidebar
   -------------------------------------------------------------------------- */

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <NavLink
        to="/app/dashboard"
        className="brand"
        onClick={onNavigate}
      >
        <span className="brand-icon">
          <img
            src="/chama-manager-logo.png"
            alt=""
            className="brand-logo"
          />
        </span>

        <span className="brand-copy">
          <strong>Chama Manager</strong>
          <small>Your chama, made clearer.</small>
        </span>
      </NavLink>

      <p className="sidebar-section-label">WORKSPACE</p>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={navClass}
            >
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <p className="sidebar-section-label management-label">
        MANAGEMENT
      </p>

      <nav className="sidebar-nav" aria-label="Management navigation">
        {managementNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={navClass}
            >
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/app/notifications"
          className="help-card"
          onClick={onNavigate}
        >
          <CircleHelp size={22} aria-hidden="true" />

          <div>
            <strong>Need a hand?</strong>
            <p>We're here to help.</p>
          </div>
        </NavLink>

        <div className="sidebar-user">
          <NavLink
            to="/app/profile"
            className="sidebar-user-link"
            onClick={onNavigate}
          >
            <span className="avatar">{member.initials}</span>

            <span className="sidebar-user-copy">
              <strong>{member.fullName}</strong>
              <span>Member account</span>
            </span>
          </NavLink>

          <button
            type="button"
            className="logout-button"
            aria-label="Log out"
            onClick={() => {
              onNavigate?.();
              navigate("/login");
            }}
          >
            <LogOut size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* --------------------------------------------------------------------------
   Shared application layout
   -------------------------------------------------------------------------- */

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const section = pathname.split("/")[2] ?? "dashboard";
  const pageTitle = pageTitles[section] ?? "Dashboard";

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {menuOpen && (
        <button
          type="button"
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        id="app-sidebar"
        className={`sidebar-wrapper${menuOpen ? " sidebar-open" : ""}`}
      >
        <Sidebar onNavigate={() => setMenuOpen(false)} />

        <button
          type="button"
          className="mobile-close"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        >
          <X size={21} />
        </button>
      </div>

      <div className="main-area">
        <header className="topbar">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Open navigation"
            aria-controls="app-sidebar"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            <span className="breadcrumb-parent">Umoja Savings Group</span>
            <ChevronRight size={15} aria-hidden="true" />
            <strong>{pageTitle}</strong>
          </div>

          <div className="topbar-actions">
            <span className="demo-badge">
              <span className="demo-dot" aria-hidden="true" />
              <span className="demo-text">Demo mode</span>
            </span>

            <NavLink
              to="/app/notifications"
              className="icon-button notification-button"
              aria-label="View notifications"
            >
              <Bell size={20} />
              <span className="notification-dot" aria-hidden="true" />
            </NavLink>

            <NavLink
              to="/app/profile"
              className="topbar-avatar"
              aria-label={`${member.fullName}, open profile`}
            >
              {member.initials}
            </NavLink>
          </div>
        </header>

        <main id="main-content" className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Placeholder pages for sections not built yet
   -------------------------------------------------------------------------- */

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="placeholder-page content-card">
      <span className="placeholder-icon" aria-hidden="true">
        <LayoutDashboard size={25} />
      </span>

      <h1>{title}</h1>

      <p>
        This section is part of the Chama Manager plan. We'll build
        it step by step using sample data first.
      </p>

      <NavLink to="/app/dashboard" className="primary-button">
        Back to dashboard
      </NavLink>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Routes
   -------------------------------------------------------------------------- */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication pages */}
        <Route
          path="/login"
          element={<PlaceholderPage title="Login" />}
        />

        <Route
          path="/register"
          element={<PlaceholderPage title="Create your account" />}
        />

        <Route
          path="/forgot-password"
          element={<PlaceholderPage title="Reset your password" />}
        />

        <Route
          path="/invite/:code"
          element={<PlaceholderPage title="Join your chama" />}
        />

        {/* Main application */}
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          {/* The new dashboard is the only dashboard */}
          <Route
            path="dashboard"
            element={<MemberDashboard />}
          />

          <Route path="members" element={<MembersPage />} />

          <Route
            path="members/:id"
            element={<MemberDetailsPage />}
          />

          <Route
            path="contributions"
            element={<ContributionsPage />}
          />

          <Route
            path="cycles"
            element={<PlaceholderPage title="Cycles & payouts" />}
          />

          <Route
            path="payouts"
            element={<PlaceholderPage title="Payout approvals" />}
          />

          <Route
            path="ledger"
            element={<PlaceholderPage title="Financial ledger" />}
          />

          <Route
            path="ledger/:id"
            element={<PlaceholderPage title="Transaction details" />}
          />

          <Route
            path="notifications"
            element={<PlaceholderPage title="Notifications" />}
          />

          <Route
            path="settings"
            element={<PlaceholderPage title="Group settings" />}
          />

          <Route
            path="profile"
            element={<PlaceholderPage title="My profile" />}
          />
        </Route>

        {/* Unknown URLs return to the landing page */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
