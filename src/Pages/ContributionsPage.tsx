
import { useMemo, useState } from "react";
import {
  Search,
  Wallet,
  CircleCheck,
  Clock,
  Plus,
  CalendarDays,
  ChevronDown,
  X,
  Info,
  CheckCircle2,
} from "lucide-react";
import "./ContributionsPage.css";

type ContributionStatus = "Paid" | "Partial" | "Unpaid" | "Overdue";

type Contribution = {
  id: number;
  member: string;
  role: string;
  amountDue: number;
  amountPaid: number;
  dueDate: string;
  status: ContributionStatus;
  lastUpdated: string;
};

const initialContributions: Contribution[] = [
  {
    id: 1,
    member: "Angela Mwangi",
    role: "Chairperson",
    amountDue: 2000,
    amountPaid: 2000,
    dueDate: "20 Oct 2026",
    status: "Paid",
    lastUpdated: "Today",
  },
  {
    id: 2,
    member: "Brian Otieno",
    role: "Treasurer",
    amountDue: 2000,
    amountPaid: 1000,
    dueDate: "20 Oct 2026",
    status: "Partial",
    lastUpdated: "Today",
  },
  {
    id: 3,
    member: "Grace Wanjiku",
    role: "Member",
    amountDue: 2000,
    amountPaid: 0,
    dueDate: "20 Oct 2026",
    status: "Unpaid",
    lastUpdated: "Not recorded",
  },
  {
    id: 4,
    member: "Kevin Kiptoo",
    role: "Member",
    amountDue: 2000,
    amountPaid: 0,
    dueDate: "10 Oct 2026",
    status: "Overdue",
    lastUpdated: "Not recorded",
  },
  {
    id: 5,
    member: "Wanjiku Mwangi",
    role: "Member",
    amountDue: 2000,
    amountPaid: 1000,
    dueDate: "20 Oct 2026",
    status: "Partial",
    lastUpdated: "Yesterday",
  },
  {
    id: 6,
    member: "Achieng A.",
    role: "Member",
    amountDue: 2000,
    amountPaid: 0,
    dueDate: "20 Oct 2026",
    status: "Unpaid",
    lastUpdated: "Not recorded",
  },
];

const formatMoney = (amount: number) =>
  `KSh ${amount.toLocaleString("en-KE")}`;

function getStatus(contribution: Contribution): ContributionStatus {
  if (contribution.amountPaid >= contribution.amountDue) return "Paid";
  if (contribution.status === "Overdue") return "Overdue";
  if (contribution.amountPaid > 0) return "Partial";
  return "Unpaid";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ContributionsPage() {
  const [contributions, setContributions] =
    useState<Contribution[]>(initialContributions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [cycle, setCycle] = useState("October 2026");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("2000");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  const totalDue = contributions.reduce(
    (total, item) => total + item.amountDue,
    0,
  );

  const totalCollected = contributions.reduce(
    (total, item) => total + item.amountPaid,
    0,
  );

  const totalOutstanding = contributions.reduce(
    (total, item) => total + Math.max(0, item.amountDue - item.amountPaid),
    0,
  );

  const progress = totalDue > 0
    ? Math.round((totalCollected / totalDue) * 100)
    : 0;

  const paidCount = contributions.filter(
    (item) => getStatus(item) === "Paid",
  ).length;

  const filteredContributions = useMemo(() => {
    return contributions.filter((item) => {
      const matchesSearch = item.member
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesStatus =
        statusFilter === "All statuses" ||
        getStatus(item) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contributions, search, statusFilter]);

  function openPaymentForm() {
    setPaymentMessage("");
    setSelectedMember("");
    setPaymentAmount("2000");
    setPaymentReference("");
    setShowPaymentForm(true);
  }

  function recordDemoPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const amount = Number(paymentAmount);

    if (!selectedMember || !Number.isFinite(amount) || amount <= 0) {
      setPaymentMessage("Choose a member and enter a valid amount.");
      return;
    }

    const memberRecord = contributions.find(
      (item) => String(item.id) === selectedMember,
    );

    if (!memberRecord) {
      setPaymentMessage("Please select a valid member.");
      return;
    }

    if (amount > memberRecord.amountDue - memberRecord.amountPaid) {
      setPaymentMessage("The amount cannot exceed the member's remaining balance.");
      return;
    }

    setContributions((current) =>
      current.map((item) => {
        if (item.id !== memberRecord.id) return item;

        const newAmountPaid = item.amountPaid + amount;

        return {
          ...item,
          amountPaid: newAmountPaid,
          status:
            newAmountPaid >= item.amountDue
              ? "Paid"
              : item.status === "Overdue"
                ? "Overdue"
                : "Partial",
          lastUpdated: "Just now",
        };
      }),
    );

    setPaymentMessage(
      `Demo payment of ${formatMoney(amount)} recorded for ${memberRecord.member}. No real payment was processed.`,
    );

    setPaymentReference("");
  }

  return (
    <section className="contributions-page">
      <div className="contributions-heading">
        <div>
          <p className="contributions-eyebrow">
            UMOJA SAVINGS GROUP
          </p>
          <h1>Contribution management</h1>
          <p className="contributions-description">
            {formatMoney(totalCollected)} confirmed of the{" "}
            {formatMoney(totalDue)} monthly target.
          </p>
        </div>

        <button
          className="record-payment-button"
          type="button"
          onClick={openPaymentForm}
        >
          <Plus size={21} />
          Record payment
        </button>
      </div>

      <section className="collection-banner" aria-label="Collection summary">
        <div className="collection-metric">
          <span>Confirmed</span>
          <strong>{formatMoney(totalCollected)}</strong>
        </div>

        <div className="collection-metric">
          <span>Outstanding</span>
          <strong>{formatMoney(totalOutstanding)}</strong>
        </div>

        <div className="collection-metric">
          <span>Due date</span>
          <strong>20 October</strong>
        </div>

        <div className="collection-progress">
          <div className="collection-progress-heading">
            <span>Collection progress</span>
            <strong>{progress}%</strong>
          </div>
          <div
            className="collection-progress-track"
            role="progressbar"
            aria-label="Contribution collection progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="collection-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <section className="contributions-table-card">
        <div className="contributions-toolbar">
          <label className="contributions-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search members"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="contributions-select">
            <span className="sr-only">Filter by payment status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All statuses</option>
              <option>Paid</option>
              <option>Partial</option>
              <option>Unpaid</option>
              <option>Overdue</option>
            </select>
            <ChevronDown size={16} />
          </label>

          <label className="contributions-select cycle-select">
            <CalendarDays size={17} />
            <select
              value={cycle}
              onChange={(event) => setCycle(event.target.value)}
            >
              <option>October 2026</option>
              <option>September 2026</option>
              <option>August 2026</option>
            </select>
            <ChevronDown size={16} />
          </label>
        </div>

        <div className="contributions-table-scroll">
          <table className="contributions-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Expected</th>
                <th>Paid</th>
                <th>Remaining</th>
                <th>Due date</th>
                <th>Status</th>
                <th>Last updated</th>
              </tr>
            </thead>

            <tbody>
              {filteredContributions.map((item) => {
                const status = getStatus(item);
                const remaining = Math.max(
                  0,
                  item.amountDue - item.amountPaid,
                );

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="contribution-member">
                        <span className="contribution-avatar">
                          {getInitials(item.member)}
                        </span>
                        <span className="contribution-member-copy">
                          <strong>{item.member}</strong>
                          <small>{item.role}</small>
                        </span>
                      </div>
                    </td>
                    <td>{formatMoney(item.amountDue)}</td>
                    <td className="paid-amount">
                      {formatMoney(item.amountPaid)}
                    </td>
                    <td>{formatMoney(remaining)}</td>
                    <td>{item.dueDate}</td>
                    <td>
                      <span
                        className={`contribution-status status-${status.toLowerCase()}`}
                      >
                        {status === "Paid" && <CheckCircle2 size={14} />}
                        {status}
                      </span>
                    </td>
                    <td>{item.lastUpdated}</td>
                  </tr>
                );
              })}

              {filteredContributions.length === 0 && (
                <tr>
                  <td colSpan={7} className="contributions-empty">
                    No members match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="contributions-table-footer">
          <span>
            Showing {filteredContributions.length} of {contributions.length} members
          </span>
          <span>Demo records · {cycle}</span>
        </div>
      </section>

      <div className="contributions-demo-note">
        <Info size={17} />
        <p>
          Demo only. Recording a payment updates this page's temporary sample
          data. No money is collected, and no M-Pesa transaction is verified.
        </p>
      </div>

      {showPaymentForm && (
        <div
          className="payment-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowPaymentForm(false);
            }
          }}
        >
          <section
            className="payment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
          >
            <div className="payment-modal-heading">
              <div>
                <span className="contributions-eyebrow">DEMO MODE</span>
                <h2 id="payment-modal-title">Record a contribution</h2>
                <p>Enter a sample payment record for a member.</p>
              </div>
              <button
                className="payment-modal-close"
                type="button"
                aria-label="Close payment form"
                onClick={() => setShowPaymentForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form className="payment-form" onSubmit={recordDemoPayment}>
              <label>
                Member
                <select
                  required
                  value={selectedMember}
                  onChange={(event) => setSelectedMember(event.target.value)}
                >
                  <option value="">Choose a member</option>
                  {contributions
                    .filter((item) => item.amountPaid < item.amountDue)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.member} · balance{" "}
                        {formatMoney(item.amountDue - item.amountPaid)}
                      </option>
                    ))}
                </select>
              </label>

              <label>
                Amount received (KSh)
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={paymentAmount}
                  onChange={(event) => setPaymentAmount(event.target.value)}
                />
              </label>

              <label>
                Payment reference (optional)
                <input
                  type="text"
                  placeholder="e.g. sample reference"
                  value={paymentReference}
                  onChange={(event) => setPaymentReference(event.target.value)}
                />
              </label>

              <p className="payment-form-note">
                This is a demo record only. A reference entered here is not
                verified against M-Pesa.
              </p>

              {paymentMessage && (
                <p
                  className="payment-form-message"
                  role="status"
                >
                  {paymentMessage}
                </p>
              )}

              <div className="payment-form-actions">
                <button
                  className="payment-cancel-button"
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                >
                  Cancel
                </button>
                <button className="record-payment-button" type="submit">
                  <Plus size={18} />
                  Save demo record
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
