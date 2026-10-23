
import { useState } from "react";
import { Search, Wallet, CircleCheck, Clock } from "lucide-react";

type Contribution = {
  id: number;
  member: string;
  amountDue: number;
  amountPaid: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Unpaid" | "Overdue";
};

const sampleContributions: Contribution[] = [
  {
    id: 1,
    member: "Angela Mwangi",
    amountDue: 2000,
    amountPaid: 2000,
    dueDate: "20 Oct 2026",
    status: "Paid",
  },
  {
    id: 2,
    member: "Brian Otieno",
    amountDue: 2000,
    amountPaid: 1000,
    dueDate: "20 Oct 2026",
    status: "Partial",
  },
  {
    id: 3,
    member: "Grace Wanjiku",
    amountDue: 2000,
    amountPaid: 0,
    dueDate: "20 Oct 2026",
    status: "Unpaid",
  },
  {
    id: 4,
    member: "Kevin Kiptoo",
    amountDue: 2000,
    amountPaid: 0,
    dueDate: "10 Oct 2026",
    status: "Overdue",
  },
];

const formatMoney = (amount: number) =>
  `KSh ${amount.toLocaleString("en-KE")}`;

function ContributionsPage() {
  const [search, setSearch] = useState("");

  const filteredContributions = sampleContributions.filter(
    (contribution) =>
      contribution.member.toLowerCase().includes(search.toLowerCase()),
  );

  const totalCollected = sampleContributions.reduce(
    (total, contribution) => total + contribution.amountPaid,
    0,
  );

  const totalOutstanding = sampleContributions.reduce(
    (total, contribution) =>
      total + contribution.amountDue - contribution.amountPaid,
    0,
  );

  const paidCount = sampleContributions.filter(
    (contribution) => contribution.status === "Paid",
  ).length;

  return (
    <section className="contributions-page">
      <div className="page-heading">
        <div>
          <h1>Contributions</h1>
          <p>Track member contributions and outstanding balances.</p>
        </div>
      </div>

      <div className="contribution-summary">
        <article className="contribution-summary-card">
          <div className="summary-icon collected-icon">
            <Wallet size={20} />
          </div>
          <p>Total collected</p>
          <h2>{formatMoney(totalCollected)}</h2>
          <span>Recorded contributions</span>
        </article>

        <article className="contribution-summary-card">
          <div className="summary-icon outstanding-icon">
            <Clock size={20} />
          </div>
          <p>Outstanding</p>
          <h2>{formatMoney(totalOutstanding)}</h2>
          <span>Still expected from members</span>
        </article>

        <article className="contribution-summary-card">
          <div className="summary-icon paid-icon">
            <CircleCheck size={20} />
          </div>
          <p>Fully paid</p>
          <h2>
            {paidCount} of {sampleContributions.length}
          </h2>
          <span>Members who paid in full</span>
        </article>
      </div>

      <div className="contributions-table-card">
        <div className="contributions-table-heading">
          <div>
            <h2>Contribution records</h2>
            <p>Sample data for the current contribution round.</p>
          </div>

          <label className="contributions-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search members..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="contributions-table-scroll">
          <table className="contributions-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Amount due</th>
                <th>Amount paid</th>
                <th>Balance</th>
                <th>Due date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredContributions.map((contribution) => (
                <tr key={contribution.id}>
                  <td className="contribution-member-name">
                    {contribution.member}
                  </td>
                  <td>{formatMoney(contribution.amountDue)}</td>
                  <td>{formatMoney(contribution.amountPaid)}</td>
                  <td>
                    {formatMoney(
                      contribution.amountDue - contribution.amountPaid,
                    )}
                  </td>
                  <td>{contribution.dueDate}</td>
                  <td>
                    <span
                      className={`contribution-status status-${contribution.status.toLowerCase()}`}
                    >
                      {contribution.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredContributions.length === 0 && (
                <tr>
                  <td colSpan={6} className="contributions-empty">
                    No members match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="contributions-demo-note">
          Demo data only. Payments are not being collected or verified.
        </p>
      </div>
    </section>
  );
}

export default ContributionsPage;
