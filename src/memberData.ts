
export type Member = {
  id: number;
  name: string;
  role: "Admin" | "Treasurer" | "Member";
  phone: string;
  status: "Active" | "Pending";
  joinedDate: string;
  totalContributions: number;
  outstandingBalance: number;
};

export const sampleMembers: Member[] = [
  {
    id: 1,
    name: "Angela Mwangi",
    role: "Admin",
    phone: "0712 345 678",
    status: "Active",
    joinedDate: "12 January 2026",
    totalContributions: 12000,
    outstandingBalance: 0,
  },
  {
    id: 2,
    name: "Brian Otieno",
    role: "Treasurer",
    phone: "0722 456 789",
    status: "Active",
    joinedDate: "15 January 2026",
    totalContributions: 10000,
    outstandingBalance: 2000,
  },
  {
    id: 3,
    name: "Grace Wanjiku",
    role: "Member",
    phone: "0701 234 567",
    status: "Active",
    joinedDate: "20 January 2026",
    totalContributions: 8000,
    outstandingBalance: 0,
  },
  {
    id: 4,
    name: "Kevin Kiptoo",
    role: "Member",
    phone: "0798 123 456",
    status: "Pending",
    joinedDate: "5 October 2026",
    totalContributions: 0,
    outstandingBalance: 2000,
  },
];
