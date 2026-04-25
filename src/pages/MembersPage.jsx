import { useState, useMemo } from "react";
import {
  Users,
  Globe,
  AlertOctagon,
  CreditCard,
  Search,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  ShieldOff,
} from "lucide-react";

// ─────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────
const DUMMY_MEMBERS = [
  {
    id: 1,
    joinDate: "23 Mar 2026",
    company: "Redstone Mining Ltd",
    initials: "RM",
    color: "bg-blue-100 text-blue-700",
    memberName: "John Mitchell",
    memberEmail: "john@redstonemining.com",
    location: "Mumbai, MH",
    mobile: "+91 89087 82420",
    status: "active",
    plan: "Enterprise",
  },
  {
    id: 2,
    joinDate: "15 Mar 2026",
    company: "Apex Technologies Pvt Ltd",
    initials: "AT",
    color: "bg-purple-100 text-purple-700",
    memberName: "Priya Sharma",
    memberEmail: "priya@apextech.in",
    location: "Bengaluru, KA",
    mobile: "+91 98765 43210",
    status: "active",
    plan: "Pro",
  },
  {
    id: 3,
    joinDate: "10 Mar 2026",
    company: "GreenLeaf Exports",
    initials: "GL",
    color: "bg-emerald-100 text-emerald-700",
    memberName: "Rahul Verma",
    memberEmail: "rahul@greenleaf.co",
    location: "Chennai, TN",
    mobile: "+91 76543 21098",
    status: "inactive",
    plan: "Starter",
  },
  {
    id: 4,
    joinDate: "05 Mar 2026",
    company: "Delta Pharma Solutions",
    initials: "DP",
    color: "bg-orange-100 text-orange-700",
    memberName: "Anita Desai",
    memberEmail: "anita@deltapharma.in",
    location: "Hyderabad, TS",
    mobile: "+91 87654 32109",
    status: "suspended",
    plan: "Enterprise",
  },
  {
    id: 5,
    joinDate: "28 Feb 2026",
    company: "Quantum Robotics Inc",
    initials: "QR",
    color: "bg-sky-100 text-sky-700",
    memberName: "Arjun Nair",
    memberEmail: "arjun@quantumrobotics.io",
    location: "Pune, MH",
    mobile: "+91 91234 56789",
    status: "active",
    plan: "Pro",
  },
  {
    id: 6,
    joinDate: "20 Feb 2026",
    company: "SunRise Textiles",
    initials: "ST",
    color: "bg-yellow-100 text-yellow-700",
    memberName: "Kavitha Iyer",
    memberEmail: "kavitha@sunrisetex.com",
    location: "Coimbatore, TN",
    mobile: "+91 99887 76655",
    status: "active",
    plan: "Starter",
  },
  {
    id: 7,
    joinDate: "14 Feb 2026",
    company: "NorthStar Logistics",
    initials: "NL",
    color: "bg-indigo-100 text-indigo-700",
    memberName: "Vikram Singh",
    memberEmail: "vikram@northstarlog.in",
    location: "Delhi, DL",
    mobile: "+91 88112 23344",
    status: "suspended",
    plan: "Pro",
  },
  {
    id: 8,
    joinDate: "08 Feb 2026",
    company: "BlueBay Foods Pvt Ltd",
    initials: "BB",
    color: "bg-teal-100 text-teal-700",
    memberName: "Meera Krishnan",
    memberEmail: "meera@bluebayfoods.in",
    location: "Kochi, KL",
    mobile: "+91 94455 66778",
    status: "active",
    plan: "Enterprise",
  },
  {
    id: 9,
    joinDate: "02 Feb 2026",
    company: "Iron Shield Construction",
    initials: "IS",
    color: "bg-red-100 text-red-700",
    memberName: "Deepak Mehta",
    memberEmail: "deepak@ironshield.co.in",
    location: "Ahmedabad, GJ",
    mobile: "+91 73344 55667",
    status: "inactive",
    plan: "Starter",
  },
  {
    id: 10,
    joinDate: "25 Jan 2026",
    company: "Pixel Craft Studios",
    initials: "PC",
    color: "bg-pink-100 text-pink-700",
    memberName: "Sneha Patel",
    memberEmail: "sneha@pixelcraft.design",
    location: "Surat, GJ",
    mobile: "+91 82233 44556",
    status: "active",
    plan: "Pro",
  },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  inactive: {
    label: "Inactive",
    className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  },
  suspended: {
    label: "Suspended",
    className: "bg-red-50 text-red-700 ring-1 ring-red-200",
  },
};

const planConfig = {
  Starter: "bg-slate-100 text-slate-700",
  Pro: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  Enterprise: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.inactive;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "active"
            ? "bg-emerald-500"
            : status === "suspended"
            ? "bg-red-500"
            : "bg-slate-400"
        }`}
      />
      {cfg.label}
    </span>
  );
}

function PlanBadge({ plan }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
        planConfig[plan] || planConfig.Starter
      }`}
    >
      {plan}
    </span>
  );
}

function StatCard({ icon: Icon, iconBg, label, value, sub, subColor }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {sub && (
        <p className={`text-xs font-medium ${subColor || "text-slate-400"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field)
    return <ChevronUp className="h-3.5 w-3.5 text-slate-300" />;
  return sortDir === "asc" ? (
    <ChevronUp className="h-3.5 w-3.5 text-blue-600" />
  ) : (
    <ChevronDown className="h-3.5 w-3.5 text-blue-600" />
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function MembersPage({ onViewMember }) {
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [sortField, setSortField] = useState("joinDate");
  const [sortDir, setSortDir] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const ROWS_PER_PAGE = 7;

  // counts
  const totalMembers = DUMMY_MEMBERS.length;
  const activeCount = DUMMY_MEMBERS.filter((m) => m.status === "active").length;
  const suspendedCount = DUMMY_MEMBERS.filter(
    (m) => m.status === "suspended"
  ).length;
  const paidCount = DUMMY_MEMBERS.filter(
    (m) => m.plan !== "Starter"
  ).length;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let list = DUMMY_MEMBERS.filter((m) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        m.company.toLowerCase().includes(q) ||
        m.memberName.toLowerCase().includes(q) ||
        m.memberEmail.toLowerCase().includes(q) ||
        m.mobile.includes(q);
      const matchesTab =
        filterTab === "all" || m.status === filterTab;
      return matchesSearch && matchesTab;
    });

    list = [...list].sort((a, b) => {
      const av = a[sortField] || "";
      const bv = b[sortField] || "";
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return list;
  }, [search, filterTab, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelectedRows(
      selectedRows.length === paginated.length
        ? []
        : paginated.map((m) => m.id)
    );

  const cols = [
    { field: "joinDate", label: "Join Date" },
    { field: "company", label: "Company" },
    { field: "memberName", label: "Member" },
    { field: "location", label: "Location" },
    { field: "mobile", label: "Mobile" },
    { field: "memberEmail", label: "Email" },
    { field: "status", label: "Status" },
    { field: "plan", label: "Plan" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            / MEMBERS
          </p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">
            Member Directory
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95">
            <Plus className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={Users}
          iconBg="bg-blue-50 text-blue-600"
          label="Total Members"
          value={totalMembers}
          sub="↑ 12.5% this month"
          subColor="text-emerald-600"
        />
        <StatCard
          icon={UserCheck}
          iconBg="bg-emerald-50 text-emerald-600"
          label="Active"
          value={activeCount}
          sub={`${Math.round((activeCount / totalMembers) * 100)}% of total`}
          subColor="text-slate-400"
        />
        <StatCard
          icon={ShieldOff}
          iconBg="bg-red-50 text-red-500"
          label="Suspended"
          value={suspendedCount}
          sub="Requires attention"
          subColor="text-red-400"
        />
        <StatCard
          icon={CreditCard}
          iconBg="bg-violet-50 text-violet-600"
          label="Paid Plans"
          value={paidCount}
          sub="Pro + Enterprise"
          subColor="text-slate-400"
        />
      </div>

      {/* ── Table card ── */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {/* Search + Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search company, name, email or mobile..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            {["all", "active", "inactive", "suspended"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setFilterTab(tab);
                  setCurrentPage(1);
                }}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold capitalize transition-all ${
                  filterTab === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-3 border-b border-blue-100 bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-700">
            <span>{selectedRows.length} selected</span>
            <button className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-50 transition-colors">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
            <button
              onClick={() => setSelectedRows([])}
              className="ml-auto text-xs text-slate-500 hover:text-slate-700"
            >
              Clear selection
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="w-10 px-5 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      paginated.length > 0 &&
                      selectedRows.length === paginated.length
                    }
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 cursor-pointer"
                  />
                </th>
                {cols.map((col) => (
                  <th
                    key={col.field}
                    onClick={() => handleSort(col.field)}
                    className="cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-700"
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      <SortIcon
                        field={col.field}
                        sortField={sortField}
                        sortDir={sortDir}
                      />
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={cols.length + 2}
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Users className="h-10 w-10 text-slate-200" />
                      <p className="font-medium">No members found</p>
                      <p className="text-xs">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((member) => (
                  <tr
                    key={member.id}
                    className={`group transition-colors hover:bg-blue-50/30 ${
                      selectedRows.includes(member.id) ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(member.id)}
                        onChange={() => toggleRow(member.id)}
                        className="h-4 w-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
                      />
                    </td>
                    {/* Join Date */}
                    <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                      {member.joinDate}
                    </td>
                    {/* Company */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${member.color}`}
                        >
                          {member.initials}
                        </span>
                        <span className="font-semibold text-slate-800 whitespace-nowrap">
                          {member.company}
                        </span>
                      </div>
                    </td>
                    {/* Member */}
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-slate-700 whitespace-nowrap">
                        {member.memberName}
                      </p>
                    </td>
                    {/* Location */}
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">
                      {member.location}
                    </td>
                    {/* Mobile */}
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap font-mono text-xs">
                      {member.mobile}
                    </td>
                    {/* Email */}
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">
                      {member.memberEmail}
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <StatusBadge status={member.status} />
                    </td>
                    {/* Plan */}
                    <td className="px-4 py-3.5">
                      <PlanBadge plan={member.plan} />
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1 opacity-90 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => onViewMember && onViewMember(member)}
                          title="View"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Edit"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-amber-100 hover:text-amber-600 transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Delete"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5 text-sm text-slate-500">
          <span>
            Showing{" "}
            <strong className="text-slate-800">
              {Math.min((currentPage - 1) * ROWS_PER_PAGE + 1, filtered.length)}
              –{Math.min(currentPage * ROWS_PER_PAGE, filtered.length)}
            </strong>{" "}
            of <strong className="text-slate-800">{filtered.length}</strong>{" "}
            members
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                  p === currentPage
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
