import { useEffect, useState } from "react";
import MembersPage from "./Pages/MembersPage";
import MemberDetailsPage from "./Pages/MemberDetailsPage";
import ContributionsPage from "./Pages/ContributionsPage";
import LandingPage from "./Pages/LandingPage";
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
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock,
  CreditCard,
  FileText,
  HandCoins,
  Hourglass,
  House,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sprout,
  Users,
  Wallet,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import "./App.css";


const member = {
  firstName: "Lynn",
  fullName: "Lynn Gathoni",
  initials: "LG",
};

const cycle = { recorded: 9, total: 12 };

type Status = "confirmed" | "awaiting" | "upcoming";

const statusMeta: Record<Status, { label: string; icon: LucideIcon }> = {
  confirmed: { label: "Confirmed", icon: CheckCircle2 },
  awaiting: { label: "Awaiting verification", icon: Hourglass },
  upcoming: { label: "Upcoming", icon: Clock },
};

type Stat = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tone: "green" | "gold" | "purple";
};

const stats: Stat[] = [
  {
    label: "Payments made",
    value: "10",
    note: "Contributions confirmed",
    icon: CheckCircle2,
    tone: "green",
  },
  {
    label: "Next payout",
    value: "25 Oct",
    note: "Scheduled group payout",
    icon: HandCoins,
    tone: "gold",
  },
  {
    label: "Group members",
    value: "12",
    note: "Members in your chama",
    icon: Users,
    tone: "purple",
  },
];

type Activity = {
  id: string;
  title: string;
  detail: string;
  amount: string;
  status: Status;
  icon: LucideIcon;
};

const activity: Activity[] = [
  {
    id: "next-due",
    title: "Next contribution due",
    detail: "Monthly contribution · Due 20 October",
    amount: "KSh 2,000",
    status: "upcoming",
    icon: CreditCard,
  },
  {
    id: "confirmed-12-oct",
    title: "Contribution confirmed",
    detail: "Monthly contribution · 12 October",
    amount: "+ KSh 2,000",
    status: "confirmed",
    icon: CheckCircle2,
  },
  {
    id: "payout-25-sep",
    title: "Group payout recorded",
    detail: "Paid to Brian Otieno · 25 September",
    amount: "KSh 24,000",
    status: "confirmed",
    icon: HandCoins,
  },
];

/* -------------------------------------------------------------------------
   Navigation
   ------------------------------------------------------------------------- */

type NavItem = { label: string; path: string; icon: LucideIcon };

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

/* -------------------------------------------------------------------------
   Small helpers
   ------------------------------------------------------------------------- */

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatToday() {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: Status }) {
  const { label, icon: Icon } = statusMeta[status];

  return (
    <span className={`status-badge status-${status}`}>
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------
   Layout
   ------------------------------------------------------------------------- */

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <NavLink to="/app/dashboard" className="brand" onClick={onNavigate}>
        <span className="brand-icon">
          <Sprout size={24} />
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

      <p className="sidebar-section-label management-label">MANAGEMENT</p>

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
        <div className="help-card">
          <CircleHelp size={22} aria-hidden="true" />
          <div>
            <strong>Need a hand?</strong>
            <p>We're here to help.</p>
          </div>
        </div>

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

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const section = pathname.split("/")[2] ?? "dashboard";
  const pageTitle = pageTitles[section] ?? "Dashboard";

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
            <span className="breadcrumb-parent">My workspace</span>
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

/* -------------------------------------------------------------------------
   Pages
   ------------------------------------------------------------------------- */

function Dashboard() {
  const percent = Math.round((cycle.recorded / cycle.total) * 100);
  const remaining = cycle.total - cycle.recorded;

  return (
    <div className="dashboard">
      <section className="welcome-section">
        <div>
          <p className="eyebrow">{formatToday()}</p>
          <h1>
            {getGreeting()}, {member.firstName} <span aria-hidden="true">👋</span>
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening with your chama today.
          </p>
        </div>

        <span className="sample-label">
          <CheckCircle2 size={15} aria-hidden="true" />
          Sample data
        </span>
      </section>

      <section className="savings-card" aria-label="Your contributions">
        <div className="savings-main">
          <div>
            <p className="savings-label">Your total contributions</p>
            <h2>KSh 20,000</h2>
            <p className="savings-description">
              10 confirmed payments so far. You're right on track.
            </p>
          </div>

          <div className="savings-icon" aria-hidden="true">
            <Sprout size={30} />
          </div>
        </div>

        <div className="savings-divider" />

        <div className="savings-footer">
          <dl className="savings-facts">
            <div>
              <dt>Next contribution</dt>
              <dd>KSh 2,000</dd>
            </div>

            <div>
              <dt>Due date</dt>
              <dd>20 October</dd>
            </div>
          </dl>

          <div className="savings-actions">
            <NavLink to="/app/contributions" className="savings-action primary">
              <CreditCard size={18} aria-hidden="true" />
              Record payment
            </NavLink>

            <NavLink to="/app/contributions" className="savings-action ghost">
              View contributions
              <ChevronRight size={17} aria-hidden="true" />
            </NavLink>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Your chama summary">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="stat-card" key={stat.label}>
              <div className="stat-card-heading">
                <span>{stat.label}</span>
                <span className={`stat-icon ${stat.tone}-icon`}>
                  <Icon size={20} aria-hidden="true" />
                </span>
              </div>

              <strong className="stat-number">{stat.value}</strong>
              <p className="stat-description">{stat.note}</p>
            </article>
          );
        })}
      </section>

      <section className="dashboard-grid">
        <article className="content-card cycle-card">
          <div className="card-heading">
            <div>
              <h3>Current savings cycle</h3>
              <p>Stay on track with your contributions.</p>
            </div>
            <CalendarDays size={22} className="muted-icon" aria-hidden="true" />
          </div>

          <div className="cycle-summary">
            <div>
              <span className="muted-text">Cycle progress</span>
              <strong>{percent}%</strong>
            </div>
            <span className="cycle-status">In progress</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Savings cycle progress"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>

          <div className="progress-caption">
            <span>
              {cycle.recorded} of {cycle.total} contributions recorded
            </span>
            <span>{remaining} remaining</span>
          </div>

          <div className="cycle-note">
            <span className="note-icon" aria-hidden="true">
              <Wallet size={18} />
            </span>
            <p>
              <strong>You're making progress!</strong>
              <br />
              Check your contributions to see your latest payment status.
            </p>
          </div>

          <NavLink to="/app/cycles" className="text-link">
            View cycle details <ChevronRight size={16} aria-hidden="true" />
          </NavLink>
        </article>

        <article className="content-card payout-card">
          <div className="card-heading">
            <div>
              <h3>Who's receiving next?</h3>
              <p>Your chama's payout rotation.</p>
            </div>
            <HandCoins size={22} className="muted-icon" aria-hidden="true" />
          </div>

          <div className="payout-person">
            <div className="person-avatar" aria-hidden="true">
              AM
            </div>
            <div className="payout-person-copy">
              <strong>Angela Mwangi</strong>
              <span>Next in the rotation</span>
            </div>
          </div>

          <div className="payout-amount">
            <span>Scheduled payout</span>
            <strong>KSh 24,000</strong>
          </div>

          <div className="payout-date">
            <CalendarDays size={18} aria-hidden="true" />
            <span>25 October 2026</span>
          </div>

          <NavLink to="/app/payouts" className="text-link">
            View payout schedule <ChevronRight size={16} aria-hidden="true" />
          </NavLink>
        </article>
      </section>

      <section className="content-card activity-card">
        <div className="card-heading activity-heading">
          <div>
            <h3>Recent activity</h3>
            <p>Latest updates from your chama.</p>
          </div>

          <NavLink to="/app/ledger" className="text-link">
            View ledger <ChevronRight size={16} aria-hidden="true" />
          </NavLink>
        </div>

        <ul className="activity-list">
          {activity.map((item) => {
            const Icon = item.icon;

            return (
              <li className="activity-row" key={item.id}>
                <span className={`activity-icon icon-${item.status}`}>
                  <Icon size={20} aria-hidden="true" />
                </span>

                <div className="activity-copy">
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>

                <div className="activity-amount">
                  <strong>{item.amount}</strong>
                  <StatusBadge status={item.status} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className="dashboard-footer">
        <span>Chama Manager</span>
        <span>Built for clearer, more transparent savings.</span>
      </footer>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="placeholder-page content-card">
      <span className="placeholder-icon" aria-hidden="true">
        <House size={25} />
      </span>
      <h1>{title}</h1>
      <p>
        This section is part of the Chama Manager plan. We'll build it step by
        step using sample data first.
      </p>
      <NavLink to="/app/dashboard" className="primary-button">
        Back to dashboard
      </NavLink>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Routes
   ------------------------------------------------------------------------- */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
        
        <Route path="/login" element={<PlaceholderPage title="Login" />} />
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

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
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

        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
