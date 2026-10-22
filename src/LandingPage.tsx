
import { Link } from "react-router-dom";
import {
  Wallet,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link to="/" className="landing-brand">
          <span className="landing-brand-icon">
            <Wallet size={22} />
          </span>
          <span>Chama Manager</span>
        </Link>

        <nav className="landing-nav">
          <Link to="/login" className="landing-login">
            Log in
          </Link>
          <Link to="/register" className="landing-nav-cta">
            Get started
          </Link>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <span className="landing-eyebrow">
            <span className="landing-eyebrow-dot" />
            Built for your chama
          </span>

          <h1>
            Your chama.
            <br />
            Your money.
            <br />
            <span>Your records.</span>
          </h1>

          <p className="landing-hero-description">
            Manage contributions, track payouts, and keep every
            member on the same page. Less confusion, more trust.
          </p>

          <div className="landing-hero-actions">
            <Link to="/register" className="landing-primary-button">
              Create your account
              <ArrowRight size={18} />
            </Link>

            <Link to="/login" className="landing-secondary-button">
              I already have an account
            </Link>
          </div>

          <div className="landing-trust-note">
            <CheckCircle2 size={17} />
            <span>Clear records. Accountable group finances.</span>
          </div>
        </div>

        <div className="landing-visual">
          <div className="landing-visual-top">
            <div>
              <span className="landing-visual-label">
                CHAMA OVERVIEW
              </span>
              <h2>Our Savings Group</h2>
            </div>
            <span className="landing-demo-badge">DEMO</span>
          </div>

          <div className="landing-savings-card">
            <span>Total contributions</span>
            <h3>KSh 48,000</h3>
            <div className="landing-savings-footer">
              <span>Sample group data</span>
              <Wallet size={22} />
            </div>
          </div>

          <div className="landing-mini-stats">
            <div>
              <span className="landing-stat-icon">
                <Users size={18} />
              </span>
              <div>
                <strong>12</strong>
                <span>Members</span>
              </div>
            </div>

            <div>
              <span className="landing-stat-icon">
                <ShieldCheck size={18} />
              </span>
              <div>
                <strong>Clear</strong>
                <span>Financial records</span>
              </div>
            </div>
          </div>

          <p className="landing-visual-note">
            Illustrative figures, not real financial data.
          </p>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-section-heading">
          <span>MADE FOR GROUP SAVINGS</span>
          <h2>Good records make stronger chamas.</h2>
          <p>
            Keep your group organised without losing track of
            the money or the people behind it.
          </p>
        </div>

        <div className="landing-feature-grid">
          <article className="landing-feature-card">
            <div className="landing-feature-icon">
              <Wallet size={23} />
            </div>
            <h3>Track contributions</h3>
            <p>
              See who's paid, who's partway there, and what
              remains outstanding.
            </p>
          </article>

          <article className="landing-feature-card">
            <div className="landing-feature-icon">
              <Users size={23} />
            </div>
            <h3>Keep everyone connected</h3>
            <p>
              Organise members, share group updates, and
              make responsibilities clearer.
            </p>
          </article>

          <article className="landing-feature-card">
            <div className="landing-feature-icon">
              <ShieldCheck size={23} />
            </div>
            <h3>Make records transparent</h3>
            <p>
              Keep a clear record of financial activity and
              the decisions made by authorised officers.
            </p>
          </article>
        </div>
      </section>

      <section className="landing-bottom-cta">
        <div>
          <h2>Ready to organise your chama?</h2>
          <p>Start with an account, then create or join a group.</p>
        </div>
        <Link to="/register" className="landing-primary-button">
          Get started
          <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="landing-footer">
        <Link to="/" className="landing-brand landing-footer-brand">
          <span className="landing-brand-icon">
            <Wallet size={19} />
          </span>
          <span>Chama Manager</span>
        </Link>
        <p>Built for clearer, more accountable group savings.</p>
      </footer>
    </main>
  );
}

export default LandingPage;
