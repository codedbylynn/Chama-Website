
import { Search, Users } from "lucide-react";
import { useState } from "react";


type Member = {
  id: number;
  name: string;
  role: "Admin" | "Treasurer" | "Member";
  phone: string;
  status: "Active" | "Pending";
};

const sampleMembers: Member[] = [
  {
    id: 1,
    name: "Angela Mwangi",
    role: "Admin",
    phone: "0712 345 678",
    status: "Active",
  },
  {
    id: 2,
    name: "Brian Otieno",
    role: "Treasurer",
    phone: "0722 456 789",
    status: "Active",
  },
  {
    id: 3,
    name: "Grace Wanjiku",
    role: "Member",
    phone: "0701 234 567",
    status: "Active",
  },
  {
    id: 4,
    name: "Kevin Kiptoo",
    role: "Member",
    phone: "0798 123 456",
    status: "Pending",
  },
];

function MembersPage() {
  const [search, setSearch] = useState("");

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
        <div className="members-total">
          <Users size={18} />
          <span>{sampleMembers.length} members</span>
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
                <tr key={member.id}>
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
