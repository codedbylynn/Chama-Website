
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  HandCoins,
  Info,
  Plus,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import "./MemberDashboard.css";

const activities = [
  {
    title: "Brian’s contribution was confirmed",
    reference: "QF83K7M2",
    time: "Today at 09:42",
    amount: "+ KSh 2,000",
    type: "confirmed",
  },
  {
    title: "Achieng’s contribution entered the ledger",
    reference: "QF71P4A9",
    time: "Yesterday at 16:18",
    amount: "+ KSh 2,000",
    type: "recorded",
  },
  {
    title: "May payout completed",
    reference: "Two approvals · 31 May",
    time: "Previous cycle",
    amount: "- KSh 12,000",
    type: "payout",
  },
];

export default function MemberDashboard() {
  const member = {
    name: "Wanjiku Mwangi",
    group: "Umoja Savings Group",
    contribution: 2000,
    collected: 4000,
    target: 12000,
    confirmed: 2,
    outstanding: 4,
    payoutPosition: 3,
    payoutMonth: "August 2025",
  };

  const progress = Math.round(
    (member.collected / member.target) * 100
  );

  return (
    <main className="member-dashboard">
      <section className="dashboard-intro">
        <div>
          <p className="eyebrow">JUNE 2025 · MEMBER VIEW</p>

          <h1>Your June contribution is due in 4 days.</h1>

          <p className="intro-description">
            Here’s what you owe, what the group has collected
            and where you are in the payout order.
          </p>
        </div>

        <button
          className="button button-primary"
          onClick={() =>
            alert("Demo only: payment recording will be implemented next.")
          }
        >
          <Plus size={18} />
          Record contribution
        </button>
      </section>

      <section className="summary-grid">
        <article className="dashboard-card contribution-card">
          <div className="card-label">YOUR CONTRIBUTION</div>

          <div className="amount-line">
            <h2>
              KSh {member.contribution.toLocaleString("en-KE")}
            </h2>
            <span className="status status-pending">
              <span className="status-dot" />
              Pending
            </span>
          </div>

          <p className="muted-text">Due Tuesday, 10 June 2025</p>

          <div className="card-divider" />

          <div className="detail-row">
            <span>Monthly expectation</span>
            <strong>
              KSh {member.contribution.toLocaleString("en-KE")}
            </strong>
          </div>

          <div className="info-note">
            <Info size={15} />
            <span>
              Demo only. An M-Pesa STK Push would be approved
              on your own phone, never in this app.
            </span>
          </div>
        </article>

        <article className="dashboard-card collection-card">
          <div className="card-label">GROUP COLLECTION</div>

          <div className="collection-amount">
            <h2>
              KSh {member.collected.toLocaleString("en-KE")}
            </h2>
            <span>
              of KSh {member.target.toLocaleString("en-KE")}
            </span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Group collection progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="collection-stats">
            <div>
              <strong>{member.confirmed}</strong>
              <span>confirmed</span>
            </div>
            <div>
              <strong>{member.outstanding}</strong>
              <span>outstanding</span>
            </div>
            <div>
              <strong>{progress}%</strong>
              <span>collected</span>
            </div>
          </div>
        </article>

        <article className="dashboard-card payout-position-card">
          <div className="card-label">YOUR PAYOUT TURN</div>

          <div className="position-number">
            #{member.payoutPosition}
          </div>

          <h3>{member.payoutMonth}</h3>
          <p className="muted-text">
            Expected KSh {member.target.toLocaleString("en-KE")}
          </p>
        </article>
      </section>

      <section className="dashboard-lower-grid">
        <article className="dashboard-card activity-card">
          <div className="section-heading">
            <div>
              <p className="card-label">RECENT RECORDS</p>
              <h2>Latest group activity</h2>
            </div>

            <a href="/app/ledger" className="text-link">
              View all <ChevronRight size={17} />
            </a>
          </div>

          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-item" key={activity.reference}>
                <div
                  className={`activity-icon activity-icon-${activity.type}`}
                >
                  {activity.type === "confirmed" ? (
                    <Check size={17} />
                  ) : activity.type === "recorded" ? (
                    <FileText size={16} />
                  ) : (
                    <ShieldCheck size={17} />
                  )}
                </div>

                <div className="activity-copy">
                  <strong>{activity.title}</strong>
                  <span>
                    {activity.reference} · {activity.time}
                  </span>
                </div>

                <strong className="activity-amount">
                  {activity.amount}
                </strong>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-card next-payout-card">
          <div className="section-heading">
            <div>
              <p className="card-label">NEXT PAYOUT</p>
              <h2>Achieng receives this turn</h2>
            </div>

            <span className="status status-pending">
              <span className="status-dot" />
              Pending
            </span>
          </div>

          <div className="recipient-row">
            <div className="recipient-avatar">AA</div>

            <div className="recipient-copy">
              <strong>Achieng A.</strong>
              <span>Position 1 of 6</span>
            </div>

            <strong className="recipient-amount">KSh 12,000</strong>
          </div>

          <div className="payout-details">
            <p>
              <CalendarDays size={16} />
              Planned for 30 June
            </p>
            <p>
              <ShieldCheck size={16} />
              Requires 2 approvals
            </p>
          </div>

          <a href="/app/payouts" className="button button-outline">
            View payout rotation <ArrowRight size={18} />
          </a>
        </article>
      </section>

      <section className="dashboard-tip">
        <div className="tip-icon">
          <Wallet size={22} />
        </div>
        <div>
          <strong>You’re making progress!</strong>
          <p>
            Check your contributions to see your latest payment status.
          </p>
        </div>
        <TrendingUp className="tip-decoration" size={24} />
      </section>

      <footer className="dashboard-footer">
        <span>
          <RefreshCw size={14} /> Sample dashboard data
        </span>
        <a href="/app/settings">
          <CircleHelp size={14} /> Help and support
        </a>
      </footer>
    </main>
  );
}
