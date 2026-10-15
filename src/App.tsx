
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileText,
  HandCoins,
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

import { useState } from "react";
import "./App.css";

const navigation = [
  { label: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
  { label: "Members", path: "/app/members", icon: Users },
  { label: "Contributions", path: "/app/contributions", icon: Wallet },
  { label: "Cycles & payouts", path: "/app/cycles", icon: CalendarDays },
  { label: "Payout approvals", path: "/app/payouts", icon: HandCoins },
  { label: "Financial ledger", path: "/app/ledger", icon: FileText },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="sidebar">
      <NavLink
        to="/app/dashboard"
        className="brand"
        onClick={onNavigate}
      >
        <span className="brand-icon">
          <Sprout size={25} />
        </span>

        <span className="brand-copy">
          <strong>Chama Manager</strong>
          <small>Your chama, made clearer.</small>
        </span>
      </NavLink>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-section-label management-label">
        MANAGEMENT
      </div>

      <nav className="sidebar-nav" aria-label="Management navigation">
        <NavLink
          to="/app/notifications"
          onClick={onNavigate}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <Bell size={19} strokeWidth={1.8} />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to="/app/settings"
          onClick={onNavigate}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={19} strokeWidth={1.8} />
          <span>Group settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <CircleHelp size={21} />
          <div>
            <strong>Need a hand?</strong>
            <p>We're here to help.</p>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="avatar">LG</div>
          <div className="sidebar-user-copy">
            <strong>Lynn Gathoni</strong>
            <span>Member account</span>
          </div>
          <LogOut size={17} />
        </div>
      </div>
    </aside>
  );
}

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      {menuOpen && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className={`sidebar-wrapper ${menuOpen ? "sidebar-open" : ""}`}>
        <Sidebar onNavigate={() => setMenuOpen(false)} />

        <button
          className="mobile-close"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        >
          <X size={21} />
        </button>
      </div>

      <main className="main-area">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            <span>My workspace</span>
            <ChevronRight size={15} />
            <strong>Chama dashboard</strong>
          </div>

          <div className="topbar-actions">
            <span className="demo-badge">
              <span className="demo-dot" />
              Demo mode
            </span>

            <button
              className="icon-button notification-button"
              aria-label="View notifications"
              onClick={() => {
                window.location.href = "/app/notifications";
              }}
            >
              <Bell size={20} />
              <span className="notification-dot" />
            </button>

            <div className="topbar-avatar" title="Lynn Gathoni">
              LG
            </div>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="welcome-section">
        <div>
          <p className="eyebrow">THURSDAY, 15 OCTOBER 2026</p>
          <h1>Good morning, Lynn <span>👋</span></h1>
          <p className="welcome-subtitle">
            Here's what's happening with your chama today.
          </p>
        </div>

        <span className="sample-label">
          <CheckCircle2 size={15} />
          Sample data
        </span>
      </section>

      <section className="savings-card">
        <div className="savings-card-top">
          <div>
            <p className="savings-label">Your total contributions</p>
            <h2>KSh 24,000</h2>
            <p className="savings-description">
              Your contributions are building towards something good.
            </p>
          </div>

          <div className="savings-icon">
            <Sprout size={30} />
          </div>
        </div>

        <div className="savings-divider" />

        <div className="savings-card-bottom">
          <div>
            <span>Next contribution</span>
            <strong>KSh 2,000</strong>
          </div>

          <div>
            <span>Due date</span>
            <strong>20 October</strong>
          </div>

          <NavLink to="/app/contributions" className="savings-action">
            View contributions
            <ChevronRight size={17} />
          </NavLink>
        </div>
      </section>

      <section className="stats-grid" aria-label="Your chama summary">
        <article className="stat-card">
          <div className="stat-card-heading">
            <span>Payments made</span>
            <span className="stat-icon green-icon">
              <CheckCircle2 size={19} />
            </span>
          </div>
          <strong className="stat-number">10</strong>
          <p className="stat-description">Contributions confirmed</p>
        </article>

        <article className="stat-card">
          <div className="stat-card-heading">
            <span>Next payout</span>
            <span className="stat-icon gold-icon">
              <HandCoins size={19} />
            </span>
          </div>
          <strong className="stat-number">25 Oct</strong>
          <p className="stat-description">Scheduled group payout</p>
        </article>

        <article className="stat-card">
          <div className="stat-card-heading">
            <span>Group members</span>
            <span className="stat-icon purple-icon">
              <Users size={19} />
            </span>
          </div>
          <strong className="stat-number">12</strong>
          <p className="stat-description">Members in your chama</p>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="content-card cycle-card">
          <div className="card-heading">
            <div>
              <h3>Current savings cycle</h3>
              <p>Stay on track with your contributions.</p>
            </div>
            <CalendarDays size={21} className="muted-icon" />
          </div>

          <div className="cycle-summary">
            <div>
              <span className="muted-text">Cycle progress</span>
              <strong>75%</strong>
            </div>
            <span className="cycle-status">In progress</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Savings cycle progress"
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-fill" />
          </div>

          <div className="progress-caption">
            <span>9 of 12 contributions recorded</span>
            <span>3 remaining</span>
          </div>

          <div className="cycle-note">
            <span className="note-icon">
              <Wallet size={18} />
            </span>
            <p>
              <strong>You're making progress!</strong>
              <br />
              Check your contributions to see your latest payment status.
            </p>
          </div>

          <NavLink to="/app/cycles" className="text-link">
            View cycle details <ChevronRight size={16} />
          </NavLink>
        </article>

        <article className="content-card payout-card">
          <div className="card-heading">
            <div>
              <h3>Who's receiving next?</h3>
              <p>Your chama's payout rotation.</p>
            </div>
            <HandCoins size={21} className="muted-icon" />
          </div>

          <div className="payout-person">
            <div className="person-avatar">AM</div>
            <div className="payout-person-copy">
              <strong>Angela Mwangi</strong>
              <span>Next in the rotation</span>
            </div>
          </div>

          <div className="payout-amount">
            <span>Scheduled payout</span>
            <strong>KSh 20,000</strong>
          </div>

          <div className="payout-date">
            <CalendarDays size={17} />
            <span>25 October 2026</span>
          </div>

          <NavLink to="/app/payouts" className="text-link">
            View payout schedule <ChevronRight size={16} />
          </NavLink>
        </article>
      </section>

      <section className="content-card activity-card">
        <div className="card-heading activity-heading">
          <div>
            <h3>Recent activity</h3>
            <p>Your latest contribution updates.</p>
          </div>

          <NavLink to="/app/ledger" className="text-link">
            View ledger <ChevronRight size={16} />
          </NavLink>
        </div>

        <div className="activity-list">
          <div className="activity-row">
            <span className="activity-icon confirmed-icon">
              <CheckCircle2 size={19} />
            </span>
            <div className="activity-copy">
              <strong>Contribution confirmed</strong>
              <span>Monthly contribution · 12 October</span>
            </div>
            <div className="activity-amount">
              <strong>+ KSh 2,000</strong>
              <span className="status-confirmed">Confirmed</span>
            </div>
          </div>

          <div className="activity-row">
            <span className="activity-icon pending-icon">
              <CreditCard size={19} />
            </span>
            <div className="activity-copy">
              <strong>Next contribution due</strong>
              <span>Monthly contribution · Due 20 October</span>
            </div>
            <div className="activity-amount">
              <strong>KSh 2,000</strong>
              <span className="status-pending">Upcoming</span>
            </div>
          </div>
        </div>
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
      <span className="placeholder-icon">
        <House size={25} />
      </span>
      <h1>{title}</h1>
      <p>
        This section is part of the Chama Manager plan. We'll build it
        step by step using sample data first.
      </p>
      <NavLink to="/app/dashboard" className="primary-button">
        Back to dashboard
      </NavLink>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />

        <Route path="/login" element={<PlaceholderPage title="Login" />} />
        <Route path="/register" element={<PlaceholderPage title="Create your account" />} />
        <Route path="/forgot-password" element={<PlaceholderPage title="Reset your password" />} />
        <Route path="/invite/:code" element={<PlaceholderPage title="Join your chama" />} />

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<PlaceholderPage title="Members" />} />
          <Route path="members/:id" element={<PlaceholderPage title="Member details" />} />
          <Route path="contributions" element={<PlaceholderPage title="Contributions" />} />
          <Route path="cycles" element={<PlaceholderPage title="Cycles & payouts" />} />
          <Route path="payouts" element={<PlaceholderPage title="Payout approvals" />} />
          <Route path="ledger" element={<PlaceholderPage title="Financial ledger" />} />
          <Route path="ledger/:id" element={<PlaceholderPage title="Transaction details" />} />
          <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="settings" element={<PlaceholderPage title="Group settings" />} />
          <Route path="profile" element={<PlaceholderPage title="My profile" />} />
        </Route>

        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
