
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Users, ChevronRight, X } from "lucide-react";
import { sampleMembers } from "./memberData";

type MemberRole = "Admin" | "Treasurer" | "Member";

function MembersPage() {
  const navigate = useNavigate();

  // State for the members currently displayed on this page
  const [members, setMembers] = useState(sampleMembers);

  // State for searching and showing the form
  const [search, setSearch] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);

  // State for the form fields
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberRole, setMemberRole] = useState<MemberRole>("Member");
  const [formError, setFormError] = useState("");

  // Filter members according to the search input
  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.phone} ${member.role}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // Save a new member
  function handleAddMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = memberName.trim();
    const phone = memberPhone.trim();

    if (!name || !phone) {
      setFormError("Please enter the member's name and phone number.");
      return;
    }

    // Basic Kenyan phone number validation
    const normalizedPhone = phone.replace(/[\s-]/g, "");
    const validKenyanPhone = /^(?:\+254|254|0)?[17]\d{8}$/;

    if (!validKenyanPhone.test(normalizedPhone)) {
      setFormError(
        "Enter a valid Kenyan phone number, e.g. 0712345678 or +254712345678.",
      );
      return;
    }

    // Prevent duplicate phone numbers
    const phoneForComparison = normalizedPhone.startsWith("+254")
      ? `0${normalizedPhone.slice(4)}`
      : normalizedPhone.startsWith("254")
        ? `0${normalizedPhone.slice(3)}`
        : normalizedPhone.startsWith("0")
          ? normalizedPhone
          : `0${normalizedPhone}`;

    const phoneAlreadyExists = members.some((member) => {
      const existingPhone = member.phone.replace(/[\s-]/g, "");
      const normalizedExisting = existingPhone.startsWith("+254")
        ? `0${existingPhone.slice(4)}`
        : existingPhone.startsWith("254")
          ? `0${existingPhone.slice(3)}`
          : existingPhone.startsWith("0")
            ? existingPhone
            : `0${existingPhone}`;

      return normalizedExisting === phoneForComparison;
    });

    if (phoneAlreadyExists) {
      setFormError("A member with this phone number already exists.");
      return;
    }

    const newMember = {
      id: Math.max(0, ...members.map((member) => member.id)) + 1,
      name,
      phone: normalizedPhone.startsWith("+254")
        ? `0${normalizedPhone.slice(4)}`
        : normalizedPhone.startsWith("254")
          ? `0${normalizedPhone.slice(3)}`
          : normalizedPhone.startsWith("0")
            ? normalizedPhone
            : `0${normalizedPhone}`,
      role: memberRole,
      status: "Active" as const,
      joinedDate: new Date().toLocaleDateString("en-KE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      totalContributions: 0,
      outstandingBalance: 2000,
    };

    setMembers((currentMembers) => [...currentMembers, newMember]);

    // Reset the form after saving
    setMemberName("");
    setMemberPhone("");
    setMemberRole("Member");
    setFormError("");
    setShowAddMember(false);
    setSearch("");
  }

  function closeAddMemberForm() {
    setShowAddMember(false);
    setMemberName("");
    setMemberPhone("");
    setMemberRole("Member");
    setFormError("");
  }

  return (
    <section className="members-page">
      {/* Page heading */}
      <div className="page-heading">
        <div>
          <h1>Members</h1>
          <p>Manage your chama members and their membership details.</p>
        </div>

        <div className="members-heading-actions">
          <div className="members-total">
            <Users size={18} />
            <span>
              {members.length} {members.length === 1 ? "member" : "members"}
            </span>
          </div>

          <button
            type="button"
            className="add-member-button"
            onClick={() => {
              setFormError("");
              setShowAddMember(true);
            }}
          >
            + Add member
          </button>
        </div>
      </div>

      {/* Add member form */}
      {showAddMember && (
        <div className="add-member-card">
          <div className="add-member-card-heading">
            <div>
              <h2>Add a member</h2>
              <p>Enter the details of the person joining your chama.</p>
            </div>

            <button
              type="button"
              className="close-form-button"
              onClick={closeAddMemberForm}
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleAddMember}>
            <label htmlFor="memberName">Full name</label>
            <input
              id="memberName"
              name="memberName"
              type="text"
              placeholder="e.g. Mary Wanjiku"
              value={memberName}
              onChange={(event) => {
                setMemberName(event.target.value);
                setFormError("");
              }}
              required
            />

            <label htmlFor="memberPhone">Phone number</label>
            <input
              id="memberPhone"
              name="memberPhone"
              type="tel"
              placeholder="e.g. 0712345678"
              value={memberPhone}
              onChange={(event) => {
                setMemberPhone(event.target.value);
                setFormError("");
              }}
              required
            />

            <label htmlFor="memberRole">Role</label>
            <select
              id="memberRole"
              name="memberRole"
              value={memberRole}
              onChange={(event) =>
                setMemberRole(event.target.value as MemberRole)
              }
            >
              <option value="Member">Member</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Admin">Admin</option>
            </select>

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            <div className="add-member-form-actions">
              <button
                type="button"
                className="cancel-member-button"
                onClick={closeAddMemberForm}
              >
                Cancel
              </button>

              <button type="submit" className="add-member-button">
                Save member
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="members-toolbar content-card">
        <div className="members-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search by name, phone or role..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      {/* Members table */}
      <div className="members-table-card content-card">
        <div className="members-table-heading">
          <h2>All members</h2>
          <span>
            {filteredMembers.length}{" "}
            {filteredMembers.length === 1 ? "result" : "results"}
          </span>
        </div>

        <div className="members-table-scroll">
          <table className="members-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Phone number</th>
                <th>Role</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="clickable-member-row"
                  onClick={() => navigate(`/app/members/${member.id}`)}
                >
                  <td>
                    <div className="member-name-cell">
                      <span className="member-avatar">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                      <span>{member.name}</span>
                    </div>
                  </td>

                  <td>{member.phone}</td>
                  <td>{member.role}</td>

                  <td>
                    <span
                      className={`member-status ${
                        member.status === "Active"
                          ? "status-active"
                          : "status-pending"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td>
                    <ChevronRight size={18} />
                  </td>
                </tr>
              ))}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className="members-empty">
                    No members match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="demo-note">
        Demo mode: member additions are temporary and will reset when this page
        reloads. No real member records are stored.
      </p>
    </section>
  );
}

export default MembersPage;
