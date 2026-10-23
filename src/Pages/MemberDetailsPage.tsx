
import { NavLink, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Phone,
  Wallet,
} from "lucide-react";
import { sampleMembers } from "../memberData";

function MemberDetailsPage() {
  const { id } = useParams();

  const member = sampleMembers.find(
    (item) => item.id === Number(id),
  );

  if (!member) {
    return (
      <section className="content-card member-not-found">
        <h1>Member not found</h1>
        <p>We couldn't find a member with that ID.</p>
        <NavLink to="/app/members" className="primary-button">
          Back to members
        </NavLink>
      </section>
    );
  }

  return (
    <section className="member-details-page">
      <NavLink to="/app/members" className="back-link">
        <ArrowLeft size={17} />
        Back to members
      </NavLink>

      <div className="member-profile-header content-card">
        <div className="member-profile-identity">
          <span className="member-profile-avatar">
            {member.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>

          <div>
            <h1>{member.name}</h1>
            <p>{member.role} · Member ID #{member.id}</p>
            <span
              className={`member-status ${
                member.status === "Active"
                  ? "status-active"
                  : "status-pending"
              }`}
            >
              {member.status}
            </span>
          </div>
        </div>
      </div>

      <div className="member-stats-grid">
        <article className="member-stat-card content-card">
          <span className="member-stat-icon">
            <Wallet size={20} />
          </span>
          <p>Total contributions</p>
          <h2>
            KSh {member.totalContributions.toLocaleString("en-KE")}
          </h2>
        </article>

        <article className="member-stat-card content-card">
          <span className="member-stat-icon outstanding-icon">
            <Clock3 size={20} />
          </span>
          <p>Outstanding balance</p>
          <h2>
            KSh {member.outstandingBalance.toLocaleString("en-KE")}
          </h2>
        </article>
      </div>

      <div className="member-information-card content-card">
        <h2>Member information</h2>

        <div className="member-information-row">
          <span className="information-label">
            <Phone size={17} />
            Phone number
          </span>
          <strong>{member.phone}</strong>
        </div>

        <div className="member-information-row">
          <span className="information-label">
            <CalendarDays size={17} />
            Date joined
          </span>
          <strong>{member.joinedDate}</strong>
        </div>

        <div className="member-information-row">
          <span className="information-label">
            <CheckCircle2 size={17} />
            Membership status
          </span>
          <strong>{member.status}</strong>
        </div>
      </div>

      <p className="demo-note">
        This profile uses fictional sample data. Contribution figures are
        illustrative and are not connected to a real payment system.
      </p>
    </section>
  );
}

export default MemberDetailsPage;
