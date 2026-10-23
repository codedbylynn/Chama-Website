import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  Check,
  Clock,
  Bell,
  Smartphone,
} from "lucide-react";

/* ---------- Types ---------- */

type Tone = "a" | "b" | "c" | "d" | "e" | "f";
type PaymentStatus = "paid" | "due";
type LedgerTag = "recorded" | "edited";
type RotationState = "done" | "next" | "later";

interface HeroRow {
  initials: string;
  tone: Tone;
  name: string;
  meta: string;
  status: PaymentStatus;
}

interface ProofItem {
  icon: LucideIcon;
  label: string;
}

interface LedgerEntry {
  ref: string;
  name: string;
  amount: string;
  note: string;
  tag: LedgerTag;
  tagLabel: string;
}

interface Member {
  name: string;
  initials: string;
  tone: Tone;
}

interface RotationMember extends Member {
  state: RotationState;
}

interface Step {
  title: string;
  text: string;
}

/* ---------- Sample data (illustrative only) ---------- */

const heroRows: HeroRow[] = [
  {
    initials: "WM",
    tone: "a",
    name: "Wanjiru M.",
    meta: "Today, 09:14",
    status: "paid",
  },
  {
    initials: "OK",
    tone: "b",
    name: "Otieno K.",
    meta: "Today, 08:02",
    status: "paid",
  },
  {
    initials: "KN",
    tone: "d",
    name: "Kamau N.",
    meta: "Due Friday",
    status: "due",
  },
];

const proofItems: ProofItem[] = [
  { icon: Smartphone, label: "M-Pesa STK Push payments" },
  { icon: ShieldCheck, label: "Audit trail on every change" },
  { icon: Users, label: "Treasurer and member roles" },
  { icon: Bell, label: "Reminders before due dates" },
];

const ledgerEntries: LedgerEntry[] = [
  {
    ref: "SCK4T9XQ2L",
    name: "Wanjiru M.",
    amount: "+2,000",
    note: "Paid by M-Pesa",
    tag: "recorded",
    tagLabel: "Recorded",
  },
  {
    ref: "SCK4T7PL0A",
    name: "Otieno K.",
    amount: "+2,000",
    note: "Paid by M-Pesa",
    tag: "recorded",
    tagLabel: "Recorded",
  },
  {
    ref: "Adjustment",
    name: "Kamau N.",
    amount: "\u22122,000",
    note: "Duplicate payment reversed by treasurer",
    tag: "edited",
    tagLabel: "Edited",
  },
];

const members: Member[] = [
  { name: "Wanjiru", initials: "WM", tone: "a" },
  { name: "Otieno", initials: "OK", tone: "b" },
  { name: "Achieng", initials: "AA", tone: "c" },
  { name: "Kamau", initials: "KN", tone: "d" },
  { name: "Mwende", initials: "MS", tone: "e" },
  { name: "Barasa", initials: "BW", tone: "f" },
];

const rotation: RotationMember[] = members.map((member, index) => ({
  ...member,
  state: index < 2 ? "done" : index === 2 ? "next" : "later",
}));

const rotationLabels: Record<RotationState, string> = {
  done: "Received",
  next: "Next",
  later: "Waiting",
};

const treasurerActions: string[] = [
  "Record and adjust entries",
  "Send payment reminders",
  "Set the payout order",
];

const memberActions: string[] = [
  "Pay with M-Pesa",
  "Read the full ledger",
  "See when your turn comes",
];

const steps: Step[] = [
  {
    title: "Create or join a group",
    text: "Set the contribution amount and how often members pay.",
  },
  {
    title: "Members pay with M-Pesa",
    text: "Each member approves a prompt on their own phone.",
  },
  {
    title: "The ledger records it",
    text: "Every payment is logged with its M-Pesa reference.",
  },
  {
    title: "Payouts follow the rotation",
    text: "Everyone can see whose turn it is and what is still owed.",
  },
];

/* ---------- Page ---------- */

function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <div className="landing-wrap landing-header-inner">
          <Link to="/" className="landing-brand">
            <span className="landing-brand-icon">
              <Wallet size={20} />
            </span>
            <span>Chama Manager</span>
          </Link>

          <nav className="landing-nav" aria-label="Main">
            <a href="#features" className="landing-nav-link">
              Features
            </a>
            <a href="#how-it-works" className="landing-nav-link">
              How it works
            </a>
            <Link to="/login" className="landing-login">
              Log in
            </Link>
            <Link to="/register" className="landing-nav-cta">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="landing-hero">
        <div className="landing-wrap landing-hero-grid">
          <div className="landing-hero-content">
            <h1>Run your chama without the notebook and the screenshots.</h1>

            <p className="landing-hero-description">
              Members pay with M-Pesa, the ledger updates itself, and
              everyone can see who has paid and who gets the next
              payout.
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
            <div className="landing-stage">
              <div className="landing-ledger-card">
                <div className="landing-ledger-head">
                  <div>
                    <h2 className="landing-ledger-title">
                      Umoja Savings Group
                    </h2>
                    <p className="landing-ledger-sub">
                      This round's contributions
                    </p>
                  </div>
                  <span className="landing-sample-tag">Sample data</span>
                </div>

                <div className="landing-progress">
                  <div className="landing-progress-text">
                    <strong>KSh 4,000</strong>
                    <span>of KSh 12,000</span>
                  </div>
                  <div
                    className="landing-progress-bar"
                    role="img"
                    aria-label="2 of 6 members have paid"
                  >
                    <span className="landing-progress-fill" />
                  </div>
                </div>

                <ul className="landing-rows">
                  {heroRows.map((row, index) => (
                    <li
                      key={row.name}
                      className="landing-row"
                      style={{ "--i": index } as CSSProperties}
                    >
                      <span
                        className={`landing-avatar landing-tone-${row.tone}`}
                      >
                        {row.initials}
                      </span>
                      <span className="landing-row-main">
                        <span className="landing-row-name">{row.name}</span>
                        <span className="landing-row-meta">{row.meta}</span>
                      </span>
                      <span className="landing-row-amount">KSh 2,000</span>
                      {row.status === "paid" ? (
                        <span className="landing-chip landing-chip-paid">
                          <Check size={13} strokeWidth={3} />
                          Paid
                        </span>
                      ) : (
                        <span className="landing-chip landing-chip-due">
                          <Clock size={13} strokeWidth={2.5} />
                          Due
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <p className="landing-ledger-foot">
                  3 more members have not paid yet
                </p>
              </div>

              <div className="landing-stage-bottom">
                <div className="landing-payout-chip">
                  <span className="landing-avatar landing-tone-c">AA</span>
                  <span className="landing-payout-text">
                    <span>Next payout</span>
                    <strong>Achieng A.</strong>
                  </span>
                </div>

                <div className="landing-phone" aria-hidden="true">
                  <div className="landing-phone-screen">
                    <span className="landing-phone-app">Chama Manager</span>
                    <span className="landing-phone-to">
                      Contribution to Umoja Savings Group
                    </span>
                    <strong className="landing-phone-amount">KSh 2,000</strong>
                    <span className="landing-pin">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="landing-phone-actions">
                      <span>Cancel</span>
                      <span>Send</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="landing-visual-note">
              Illustrative figures, not real financial data.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Proof strip ---------- */}
      <section className="landing-proof" aria-label="Highlights">
        <div className="landing-wrap">
          <ul className="landing-proof-list">
            {proofItems.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={20} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="landing-features" id="features">
        <div className="landing-wrap">
          <div className="landing-section-head">
            <h2>Everything the group needs to trust the numbers.</h2>
            <p>
              Keep your group organised without losing track of the money
              or the people behind it.
            </p>
          </div>

          <div className="landing-bento">
            {/* Ledger */}
            <article className="landing-card landing-card-ledger">
              <h3>A ledger the whole group can read</h3>
              <p>
                Every payment is logged with its M-Pesa reference. When the
                treasurer corrects an entry, the change and the reason stay
                visible.
              </p>

              <div className="landing-table-wrap">
                <table className="landing-table">
                  <caption className="landing-sr-only">
                    Sample ledger entries
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Reference</th>
                      <th scope="col">Member</th>
                      <th scope="col">KSh</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledgerEntries.map((entry) => (
                      <tr key={entry.ref + entry.name}>
                        <td className="landing-table-ref">{entry.ref}</td>
                        <td>
                          <span className="landing-table-name">
                            {entry.name}
                          </span>
                          <span className="landing-table-note">
                            {entry.note}
                          </span>
                        </td>
                        <td
                          className={`landing-table-amount ${
                            entry.tag === "edited" ? "is-negative" : ""
                          }`}
                        >
                          {entry.amount}
                        </td>
                        <td>
                          <span
                            className={`landing-chip landing-chip-${
                              entry.tag === "edited" ? "due" : "paid"
                            }`}
                          >
                            {entry.tagLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* Rotation */}
            <article className="landing-card landing-card-rotation">
              <h3>Everyone knows whose turn it is</h3>
              <p>The payout order is set by the group and visible to all.</p>

              <ol className="landing-rotation" aria-label="Sample payout order">
                {rotation.map((member) => (
                  <li
                    key={member.name}
                    className={`landing-rotation-item is-${member.state}`}
                  >
                    <span className="landing-rotation-avatar">
                      <span
                        className={`landing-avatar landing-tone-${member.tone}`}
                      >
                        {member.initials}
                      </span>
                      {member.state === "done" && (
                        <span className="landing-rotation-badge">
                          <Check size={11} strokeWidth={3.5} />
                        </span>
                      )}
                    </span>
                    <span className="landing-rotation-name">
                      {member.name}
                    </span>
                    <span className="landing-rotation-state">
                      {rotationLabels[member.state]}
                    </span>
                  </li>
                ))}
              </ol>
            </article>

            {/* Phone */}
            <article className="landing-card landing-card-phone">
              <h3>Payments and reminders on the phone</h3>
              <p>
                Members approve an M-Pesa prompt to pay. Reminders go out
                before the due date, so the treasurer stops chasing.
              </p>

              <div className="landing-bubbles" aria-label="Sample reminder">
                <div className="landing-bubble">
                  <span className="landing-bubble-icon">
                    <Bell size={15} />
                  </span>
                  <span>
                    Reminder: your KSh 2,000 contribution to Umoja Savings
                    Group is due on Friday.
                  </span>
                </div>
                <div className="landing-bubble landing-bubble-reply">
                  <span className="landing-bubble-icon">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span>Payment received. Thank you, Wanjiru.</span>
                </div>
              </div>
            </article>

            {/* Roles */}
            <article className="landing-card landing-card-roles">
              <h3>Treasurers and members see what they need</h3>
              <p>
                Authorised officers manage the money. Every member can see
                where it went.
              </p>

              <div className="landing-roles-grid">
                <div className="landing-role landing-role-treasurer">
                  <h4>Treasurer</h4>
                  <ul>
                    {treasurerActions.map((action) => (
                      <li key={action}>
                        <Check size={16} strokeWidth={3} />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="landing-role landing-role-member">
                  <h4>Member</h4>
                  <ul>
                    {memberActions.map((action) => (
                      <li key={action}>
                        <Check size={16} strokeWidth={3} />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="landing-how" id="how-it-works">
        <div className="landing-wrap">
          <div className="landing-section-head">
            <h2>From first contribution to payout.</h2>
            <p>
              A simple cycle every member can follow, with nothing kept
              off the record.
            </p>
          </div>

          <ol className="landing-steps">
            {steps.map((step, index) => (
              <li key={step.title} className="landing-step">
                <span className="landing-step-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Bottom CTA ---------- */}
      <section className="landing-cta">
        <div className="landing-wrap">
          <div className="landing-cta-panel">
            <div className="landing-cta-text">
              <h2>Ready to organise your chama?</h2>
              <p>Start with an account, then create or join a group.</p>
            </div>

            <div className="landing-cta-actions">
              <Link to="/register" className="landing-primary-button">
                Get started
                <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="landing-cta-link">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="landing-footer">
        <div className="landing-wrap landing-footer-inner">
          <div className="landing-footer-about">
            <Link to="/" className="landing-brand landing-footer-brand">
              <span className="landing-brand-icon">
                <Wallet size={18} />
              </span>
              <span>Chama Manager</span>
            </Link>
            <p>Built for clearer, more accountable group savings.</p>
          </div>

          <nav className="landing-footer-links" aria-label="Footer">
            <Link to="/login">Log in</Link>
            <Link to="/register">Create account</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
