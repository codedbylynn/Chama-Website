import { Search, Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleMembers } from "./memberData";


type Member = {
  id: number;
  name: string;
  role: "Admin" | "Treasurer" | "Member";
  phone: string;
  status: "Active" | "Pending";
};



function MembersPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showAddMember, setShowAddMember] = useState(false);

  const filteredMembers = sampleMembers.filter((member) =>
    `${member.name} ${member.phone} ${member.role}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <section className="members-page">
     
<div className="page-heading">
  <div>
    <h1>Members</h1>
    <p>Manage your chama members and their membership details.</p>
  </div>

  <div className="members-heading-actions">
    <div className="members-total">
      <Users size={18} />
      <span>{sampleMembers.length} members</span>
    </div>

    <button
      type="button"
      className="add-member-button"
      onClick={() => setShowAddMember(true)}
    >
      + Add member
    </button>
  </div>
</div>


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

      <div className="members-table-card content-card">
        <div className="members-table-heading">
          <h2>All members</h2>
          <span>{filteredMembers.length} results</span>
        </div>

        <div className="members-table-scroll">
          <table className="members-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Phone number</th>
                <th>Role</th>
                <th>Status</th>
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
                          .join("")}
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
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={4} className="members-empty">
                    No members match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="demo-note">
        These are sample members for demonstration. No real member records are
        stored.
      </p>
    </section>
  );
}

export default MembersPage;
