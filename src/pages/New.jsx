import { useState, useMemo } from "react";
import {
  Users,
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
  ChevronLeft,
  ChevronRight,
  UserCheck,
  ShieldOff,
  MoreVertical,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────────────────────────────────────
const DUMMY_MEMBERS = [
  { id: 1, joinDate: "23 Mar 2026", company: "Redstone Mining Ltd",      initials: "RM", color: "bg-blue-100 text-blue-700",    memberName: "John Mitchell",  memberEmail: "john@redstonemining.com",    location: "Mumbai, MH",       mobile: "+91 89087 82420", status: "active",    plan: "Enterprise" },
  { id: 2, joinDate: "15 Mar 2026", company: "Apex Technologies Pvt Ltd", initials: "AT", color: "bg-purple-100 text-purple-700", memberName: "Priya Sharma",   memberEmail: "priya@apextech.in",          location: "Bengaluru, KA",    mobile: "+91 98765 43210", status: "active",    plan: "Pro"        },
  { id: 3, joinDate: "10 Mar 2026", company: "GreenLeaf Exports",         initials: "GL", color: "bg-emerald-100 text-emerald-700",memberName: "Rahul Verma",    memberEmail: "rahul@greenleaf.co",         location: "Chennai, TN",      mobile: "+91 76543 21098", status: "inactive",  plan: "Starter"    },
  { id: 4, joinDate: "05 Mar 2026", company: "Delta Pharma Solutions",    initials: "DP", color: "bg-orange-100 text-orange-700", memberName: "Anita Desai",    memberEmail: "anita@deltapharma.in",       location: "Hyderabad, TS",    mobile: "+91 87654 32109", status: "suspended", plan: "Enterprise" },
  { id: 5, joinDate: "28 Feb 2026", company: "Quantum Robotics Inc",      initials: "QR", color: "bg-sky-100 text-sky-700",      memberName: "Arjun Nair",     memberEmail: "arjun@quantumrobotics.io",   location: "Pune, MH",         mobile: "+91 91234 56789", status: "active",    plan: "Pro"        },
  { id: 6, joinDate: "20 Feb 2026", company: "SunRise Textiles",          initials: "ST", color: "bg-yellow-100 text-yellow-700", memberName: "Kavitha Iyer",   memberEmail: "kavitha@sunrisetex.com",     location: "Coimbatore, TN",   mobile: "+91 99887 76655", status: "active",    plan: "Starter"    },
  { id: 7, joinDate: "14 Feb 2026", company: "NorthStar Logistics",       initials: "NL", color: "bg-indigo-100 text-indigo-700", memberName: "Vikram Singh",   memberEmail: "vikram@northstarlog.in",     location: "Delhi, DL",        mobile: "+91 88112 23344", status: "suspended", plan: "Pro"        },
  { id: 8, joinDate: "08 Feb 2026", company: "BlueBay Foods Pvt Ltd",     initials: "BB", color: "bg-teal-100 text-teal-700",    memberName: "Meera Krishnan", memberEmail: "meera@bluebayfoods.in",      location: "Kochi, KL",        mobile: "+91 94455 66778", status: "active",    plan: "Enterprise" },
  { id: 9, joinDate: "02 Feb 2026", company: "Iron Shield Construction",  initials: "IS", color: "bg-red-100 text-red-700",      memberName: "Deepak Mehta",   memberEmail: "deepak@ironshield.co.in",    location: "Ahmedabad, GJ",    mobile: "+91 73344 55667", status: "inactive",  plan: "Starter"    },
  { id: 10,joinDate: "25 Jan 2026", company: "Pixel Craft Studios",       initials: "PC", color: "bg-pink-100 text-pink-700",    memberName: "Sneha Patel",    memberEmail: "sneha@pixelcraft.design",    location: "Surat, GJ",        mobile: "+91 82233 44556", status: "active",    plan: "Pro"        },
  { id: 11,joinDate: "18 Jan 2026", company: "SwiftMove Transport",       initials: "SM", color: "bg-cyan-100 text-cyan-700",    memberName: "Arun Kumar",     memberEmail: "arun@swiftmove.in",          location: "Jaipur, RJ",       mobile: "+91 90001 23456", status: "active",    plan: "Starter"    },
  { id: 12,joinDate: "10 Jan 2026", company: "FreshFarm Organics",        initials: "FF", color: "bg-lime-100 text-lime-700",    memberName: "Nisha Goyal",    memberEmail: "nisha@freshfarm.co",         location: "Lucknow, UP",      mobile: "+91 91122 33445", status: "inactive",  plan: "Pro"        },
];

// ─────────────────────────────────────────────────────────────────────────────
// BADGE HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_CFG = {
  active:    { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50",  ring: "ring-emerald-200", label: "Active"    },
  inactive:  { dot: "bg-slate-400",   text: "text-slate-600",   bg: "bg-slate-100",   ring: "ring-slate-200",   label: "Inactive"  },
  suspended: { dot: "bg-red-500",     text: "text-red-700",     bg: "bg-red-50",      ring: "ring-red-200",     label: "Suspended" },
};

const PLAN_CFG = {
  Starter:    "bg-slate-100   text-slate-700",
  Pro:        "bg-blue-50     text-blue-700   ring-1 ring-blue-200",
  Enterprise: "bg-violet-50   text-violet-700 ring-1 ring-violet-200",
};

function StatusBadge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG.inactive;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${c.bg} ${c.text} ${c.ring}`}>
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
}

function PlanBadge({ plan }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${PLAN_CFG[plan] || PLAN_CFG.Starter}`}>
      {plan}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, iconCls, label, value, sub, subCls }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconCls}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500 truncate">{label}</p>
        <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>
        {sub && <p className={`text-xs font-medium mt-0.5 ${subCls || "text-slate-400"}`}>{sub}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SORT ICON
// ─────────────────────────────────────────────────────────────────────────────
function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ChevronUp className="h-3.5 w-3.5 text-slate-300" />;
  return sortDir === "asc"
    ? <ChevronUp   className="h-3.5 w-3.5 text-blue-500" />
    : <ChevronDown className="h-3.5 w-3.5 text-blue-500" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW ACTION MENU  (always visible "⋮" button → inline dropdown)
// ─────────────────────────────────────────────────────────────────────────────
function RowActions({ member, onView }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-end">
      {/* Quick icon buttons — always visible */}
      <div className="flex items-center gap-0.5 mr-1">
        <button
          onClick={() => onView && onView(member)}
          title="View"
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
        <button
          title="Edit"
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          title="Delete"
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ⋮ more button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
          open ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        }`}
      >
        <MoreVertical className="h-3.5 w-3.5" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          {/* Dropdown */}
          <div className="absolute right-0 top-8 z-20 w-44 rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
            <DropdownItem icon={<UserCheck className="h-3.5 w-3.5" />} label="Activate" color="text-emerald-600" onClick={() => setOpen(false)} />
            <DropdownItem icon={<ShieldOff  className="h-3.5 w-3.5" />} label="Suspend"  color="text-orange-600" onClick={() => setOpen(false)} />
            <DropdownItem icon={<CreditCard className="h-3.5 w-3.5" />} label="Assign Plan" color="text-blue-600" onClick={() => setOpen(false)} />
            <div className="my-1 border-t border-slate-100" />
            <DropdownItem icon={<Trash2 className="h-3.5 w-3.5" />}     label="Delete"  color="text-red-600"    onClick={() => setOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}

function DropdownItem({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-sm font-medium transition-colors hover:bg-slate-50 ${color}`}
    >
      {icon} {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTER TABS
// ─────────────────────────────────────────────────────────────────────────────
const TABS = ["all", "active", "inactive", "suspended"];

const TAB_COUNTS = (list) => ({
  all:       list.length,
  active:    list.filter((m) => m.status === "active").length,
  inactive:  list.filter((m) => m.status === "inactive").length,
  suspended: list.filter((m) => m.status === "suspended").length,
});

// ─────────────────────────────────────────────────────────────────────────────
// COLUMN DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────
const COLS = [
  { field: "joinDate",    label: "Join Date",  width: "w-28"  },
  { field: "company",     label: "Company",    width: "w-56"  },
  { field: "memberName",  label: "Member",     width: "w-36"  },
  { field: "location",    label: "Location",   width: "w-32"  },
  { field: "mobile",      label: "Mobile",     width: "w-36"  },
  { field: "memberEmail", label: "Email",      width: "w-52"  },
  { field: "status",      label: "Status",     width: "w-28"  },
  { field: "plan",        label: "Plan",       width: "w-24"  },
];

const ROWS_PER_PAGE = 8;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function MembersPage({ onViewMember }) {
  const [search,       setSearch]       = useState("");
  const [filterTab,    setFilterTab]    = useState("all");
  const [sortField,    setSortField]    = useState("joinDate");
  const [sortDir,      setSortDir]      = useState("desc");
  const [currentPage,  setCurrentPage]  = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  // counts for stat cards
  const totalMembers  = DUMMY_MEMBERS.length;
  const activeCount   = DUMMY_MEMBERS.filter((m) => m.status === "active").length;
  const suspendedCount= DUMMY_MEMBERS.filter((m) => m.status === "suspended").length;
  const paidCount     = DUMMY_MEMBERS.filter((m) => m.plan !== "Starter").length;

  const handleSort = (field) => {
    setSortField(field);
    setSortDir((d) => (sortField === field && d === "asc" ? "desc" : "asc"));
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return [...DUMMY_MEMBERS]
      .filter((m) => {
        const matchSearch = !q || [m.company, m.memberName, m.memberEmail, m.mobile]
          .some((v) => v.toLowerCase().includes(q));
        const matchTab = filterTab === "all" || m.status === filterTab;
        return matchSearch && matchTab;
      })
      .sort((a, b) => {
        const av = String(a[sortField] ?? "");
        const bv = String(b[sortField] ?? "");
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, filterTab, sortField, sortDir]);

  const tabCounts  = TAB_COUNTS(DUMMY_MEMBERS);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const allChecked    = paginated.length > 0 && paginated.every((m) => selectedRows.includes(m.id));
  const toggleAll     = () => setSelectedRows(allChecked ? [] : paginated.map((m) => m.id));
  const toggleRow     = (id) => setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  const clearSelected = () => setSelectedRows([]);

  const goToPage = (p) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  const handleSearch = (v) => { setSearch(v); setCurrentPage(1); };
  const handleTab    = (t) => { setFilterTab(t); setCurrentPage(1); setSelectedRows([]); };

  return (
    /* Full viewport height layout — prevents Y overflow */
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">

      {/* ── Scrollable outer wrapper ── */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">

        {/* ── Page header ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
              / MEMBERS
            </p>
            <h1 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900">
              Member Directory
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {}}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
              <Plus className="h-3.5 w-3.5" /> Add Member
            </button>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Users}     iconCls="bg-blue-50 text-blue-600"    label="Total Members" value={totalMembers}   sub="↑ 12.5% this month"     subCls="text-emerald-600" />
          <StatCard icon={UserCheck} iconCls="bg-emerald-50 text-emerald-600" label="Active"     value={activeCount}   sub={`${Math.round(activeCount/totalMembers*100)}% of total`} />
          <StatCard icon={ShieldOff} iconCls="bg-red-50 text-red-500"       label="Suspended"    value={suspendedCount} sub="Requires attention"     subCls="text-red-400" />
          <StatCard icon={CreditCard}iconCls="bg-violet-50 text-violet-600" label="Paid Plans"   value={paidCount}     sub="Pro + Enterprise"       />
        </div>

        {/* ── Table card ── */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

          {/* ── Search + filter bar ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
            {/* Search */}
            <div className="relative min-w-55 flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search company, name, email..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              {search && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTab(tab)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                    filterTab === tab
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    filterTab === tab ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {tabCounts[tab]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Bulk action bar ── */}
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-3 border-b border-blue-100 bg-blue-50 px-5 py-2">
              <span className="text-sm font-semibold text-blue-700">
                {selectedRows.length} selected
              </span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200 hover:bg-emerald-50 transition-colors">
                  <UserCheck className="h-3 w-3" /> Activate
                </button>
                <button className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-orange-600 ring-1 ring-orange-200 hover:bg-orange-50 transition-colors">
                  <ShieldOff className="h-3 w-3" /> Suspend
                </button>
                <button className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-50 transition-colors">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
              <button onClick={clearSelected} className="ml-auto text-xs text-slate-400 hover:text-slate-600">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* ── Table wrapper: fills remaining card height + scrolls vertically ── */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse text-sm">
              {/* STICKY HEADER */}
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="w-10 px-5 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                    />
                  </th>
                  {COLS.map((col) => (
                    <th
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                      className={`cursor-pointer select-none px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-800 ${col.width}`}
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        <SortIcon field={col.field} sortField={sortField} sortDir={sortDir} />
                      </span>
                    </th>
                  ))}
                  {/* Actions header — fixed right */}
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={COLS.length + 2} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-400">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                          <Users className="h-7 w-7 text-slate-300" />
                        </div>
                        <p className="font-semibold text-slate-600">No members found</p>
                        <p className="text-xs text-slate-400 max-w-[22ch] text-center">
                          Try adjusting your search or filter to find what you're looking for
                        </p>
                        {(search || filterTab !== "all") && (
                          <button
                            onClick={() => { handleSearch(""); handleTab("all"); }}
                            className="mt-1 rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((member) => {
                    const isSelected = selectedRows.includes(member.id);
                    return (
                      <tr
                        key={member.id}
                        className={`group transition-colors ${
                          isSelected
                            ? "bg-blue-50/60"
                            : "hover:bg-slate-50/80"
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="px-5 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleRow(member.id)}
                            className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                          />
                        </td>

                        {/* Join Date */}
                        <td className="px-4 py-3 text-xs tabular-nums text-slate-500 whitespace-nowrap">
                          {member.joinDate}
                        </td>

                        {/* Company */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${member.color}`}>
                              {member.initials}
                            </span>
                            <span className="font-semibold text-slate-800 truncate max-w-40">
                              {member.company}
                            </span>
                          </div>
                        </td>

                        {/* Member Name */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-medium text-slate-700">{member.memberName}</span>
                        </td>

                        {/* Location */}
                        <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                          {member.location}
                        </td>

                        {/* Mobile */}
                        <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">
                          {member.mobile}
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                          {member.memberEmail}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusBadge status={member.status} />
                        </td>

                        {/* Plan */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <PlanBadge plan={member.plan} />
                        </td>

                        {/* Actions — always visible */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <RowActions
                            member={member}
                            onView={onViewMember}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-5 py-3">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filtered.length === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1}–
                {Math.min(currentPage * ROWS_PER_PAGE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">{filtered.length}</span> members
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold transition-all ${
                    p === currentPage
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
        {/* end table card */}

      </div>
      {/* end scrollable wrapper */}

    </div>
  );
}
