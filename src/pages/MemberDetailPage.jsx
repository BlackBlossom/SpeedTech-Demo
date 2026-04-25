import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Globe,
  Mail,
  Phone,
  Calendar,
  Wifi,
  CreditCard,
  CheckCircle2,
  Users,
  MapPin,
  FileText,
  Pencil,
  Save,
  X,
  ChevronRight,
  Hash,
  Shield,
  RotateCcw,
  Layers,
} from "lucide-react";

// ─────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────
const DUMMY_MEMBER = {
  id: 1,
  joinDate: "23 Mar 2026",
  joinIp: "95.66.134.42",
  status: "active",
  plan: "Enterprise",
  company: {
    name: "Redstone Mining Ltd",
    businessType: "Manufacturer",
    website: "www.redstonemining.com",
    email: "contact@redstonemining.com",
    gstNo: "29ABCDE1234F1Z5",
    phone1: "+91 8908782420",
    phone2: "",
    about:
      "Redstone Mining Ltd is a leading manufacturer of industrial minerals and aggregates, supplying clients across South Asia with premium-grade materials since 2012.",
    logoUrl: "",
    initials: "RM",
    color: "bg-blue-100 text-blue-700",
  },
  contacts: [
    {
      id: 1,
      name: "John Mitchell",
      role: "CEO",
      email: "john@redstonemining.com",
      phone: "+91 89087 82420",
      primary: true,
    },
    {
      id: 2,
      name: "Sara Kapoor",
      role: "Finance Manager",
      email: "sara@redstonemining.com",
      phone: "+91 99001 12233",
      primary: false,
    },
  ],
  addresses: [
    {
      id: 1,
      type: "Registered",
      line1: "Plot 12, Industrial Area Phase II",
      line2: "Navi Mumbai",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400701",
      country: "India",
    },
  ],
  statusHistory: [
    {
      date: "23 Mar 2026",
      status: "active",
      note: "Account activated after KYC approval",
      by: "Admin",
    },
    {
      date: "23 Mar 2026",
      status: "inactive",
      note: "Registration completed",
      by: "System",
    },
  ],
  currentPlan: {
    name: "Enterprise",
    price: "₹24,999 / year",
    renewalDate: "23 Mar 2027",
    features: [
      "Unlimited domains",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
};

const TABS = [
  { id: "company", label: "Company", icon: Building2 },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "currentplan", label: "Current Plan", icon: CreditCard },
  { id: "assignplan", label: "Assign Plan", icon: Layers },
  { id: "email", label: "Email", icon: Mail },
  { id: "statushistory", label: "Status History", icon: RotateCcw },
];

const STATUS_COLORS = {
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  inactive: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  suspended: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const BUSINESS_TYPES = [
  "Manufacturer",
  "Trader",
  "Service Provider",
  "Retailer",
  "Wholesaler",
  "Distributor",
  "Importer / Exporter",
  "Other",
];

const PLANS = ["Starter", "Pro", "Enterprise"];

// ─────────────────────────────────────────────
// FIELD COMPONENT
// ─────────────────────────────────────────────
function Field({ label, icon: Icon, children }) {
  return (
    <div className="grid grid-cols-[180px_1fr] items-start gap-4 border-b border-slate-50 py-4 last:border-0">
      <label className="flex items-center gap-2 pt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
        {label}
      </label>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
}

function EditableInput({ value, onChange, editing, type = "text", ...props }) {
  if (!editing)
    return (
      <span className="text-slate-800">
        {value || <span className="text-slate-300">—</span>}
      </span>
    );
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
      {...props}
    />
  );
}

function EditableSelect({ value, onChange, editing, options }) {
  if (!editing)
    return <span className="text-slate-800">{value}</span>;
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────
// TAB CONTENT COMPONENTS
// ─────────────────────────────────────────────

function CompanyTab({ data }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...data });

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    // In real app, save to backend
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Logo panel */}
      <div className="shrink-0 lg:w-56">
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Company Logo
          </p>
          <div
            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-xl text-2xl font-bold ${data.color}`}
          >
            {data.initials}
          </div>
          <input
            type="text"
            placeholder="Paste image URL..."
            className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 placeholder-slate-300 focus:border-blue-300 focus:outline-none"
          />
          <p className="mt-1.5 text-[10px] text-slate-400">
            Upload coming soon
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              // COMPANY INFORMATION
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-slate-800">
              Company Information
            </h2>
            <p className="text-sm text-slate-500">
              Business identity, registration, logo and contact numbers
            </p>
          </div>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 active:scale-95"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setForm({ ...data });
                  setEditing(false);
                }}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
              >
                <X className="h-3.5 w-3.5" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
              >
                <Save className="h-3.5 w-3.5" /> Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-100 bg-white px-5 shadow-sm">
          <Field label="Company Name" icon={Building2}>
            <EditableInput
              value={form.name}
              onChange={set("name")}
              editing={editing}
            />
          </Field>
          <Field label="Business Type" icon={Layers}>
            <EditableSelect
              value={form.businessType}
              onChange={set("businessType")}
              editing={editing}
              options={BUSINESS_TYPES}
            />
          </Field>
          <Field label="Website" icon={Globe}>
            <EditableInput
              value={form.website}
              onChange={set("website")}
              editing={editing}
              type="url"
            />
          </Field>
          <Field label="Email ID" icon={Mail}>
            <EditableInput
              value={form.email}
              onChange={set("email")}
              editing={editing}
              type="email"
            />
          </Field>
          <Field label="GST No" icon={Hash}>
            <EditableInput
              value={form.gstNo}
              onChange={set("gstNo")}
              editing={editing}
              className="font-mono"
            />
          </Field>
          <Field label="Phone No 1" icon={Phone}>
            <EditableInput
              value={form.phone1}
              onChange={set("phone1")}
              editing={editing}
              type="tel"
            />
          </Field>
          <Field label="Phone No 2" icon={Phone}>
            <EditableInput
              value={form.phone2}
              onChange={set("phone2")}
              editing={editing}
              type="tel"
            />
          </Field>
          <Field label="About Us" icon={FileText}>
            {editing ? (
              <textarea
                value={form.about}
                onChange={(e) => set("about")(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            ) : (
              <p className="text-slate-600 leading-relaxed">
                {form.about || <span className="text-slate-300">—</span>}
              </p>
            )}
          </Field>
        </div>
      </div>
    </div>
  );
}

function ContactsTab({ contacts }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            // CONTACTS
          </p>
          <h2 className="mt-0.5 text-lg font-bold text-slate-800">
            Contact Persons
          </h2>
          <p className="text-sm text-slate-500">
            People associated with this company
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95">
          + Add Contact
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="relative rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            {c.primary && (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 ring-1 ring-blue-200">
                <CheckCircle2 className="h-2.5 w-2.5" /> Primary
              </span>
            )}
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
                {c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{c.name}</p>
                <p className="text-xs text-slate-400">{c.role}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {c.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {c.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressesTab({ addresses }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            // ADDRESSES
          </p>
          <h2 className="mt-0.5 text-lg font-bold text-slate-800">
            Registered Addresses
          </h2>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95">
          + Add Address
        </button>
      </div>
      <div className="grid gap-3">
        {addresses.map((a) => (
          <div
            key={a.id}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                {a.type} Office
              </span>
            </div>
            <p className="text-sm font-medium text-slate-800">{a.line1}</p>
            {a.line2 && (
              <p className="text-sm text-slate-500">{a.line2}</p>
            )}
            <p className="mt-1 text-sm text-slate-500">
              {a.city}, {a.state} – {a.pincode}
            </p>
            <p className="text-sm text-slate-400">{a.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrentPlanTab({ plan }) {
  return (
    <div>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          // CURRENT PLAN
        </p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-800">
          Active Subscription
        </h2>
      </div>
      <div className="rounded-xl border border-violet-100 bg-linear-to-br from-violet-50 to-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-bold text-violet-700">
            <Shield className="h-4 w-4" /> {plan.name}
          </span>
          <span className="text-xl font-bold text-slate-800">{plan.price}</span>
        </div>
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="h-4 w-4" />
          Renews on <span className="font-medium text-slate-700">{plan.renewalDate}</span>
        </div>
        <ul className="space-y-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AssignPlanTab() {
  const [selected, setSelected] = useState("Enterprise");
  return (
    <div>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          // ASSIGN PLAN
        </p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-800">
          Change Member Plan
        </h2>
        <p className="text-sm text-slate-500">
          Select a plan to assign to this member
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            name: "Starter",
            price: "₹2,999/yr",
            desc: "Basic features for small teams",
            color: "border-slate-200 hover:border-slate-400",
            active: "border-blue-400 bg-blue-50",
          },
          {
            name: "Pro",
            price: "₹9,999/yr",
            desc: "Advanced analytics and integrations",
            color: "border-slate-200 hover:border-blue-300",
            active: "border-blue-400 bg-blue-50",
          },
          {
            name: "Enterprise",
            price: "₹24,999/yr",
            desc: "Unlimited everything + support",
            color: "border-slate-200 hover:border-violet-300",
            active: "border-violet-400 bg-violet-50",
          },
        ].map((p) => (
          <button
            key={p.name}
            onClick={() => setSelected(p.name)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              selected === p.name ? p.active : p.color + " bg-white"
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="font-bold text-slate-800">{p.name}</span>
              {selected === p.name && (
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <p className="text-base font-semibold text-blue-600">{p.price}</p>
            <p className="mt-1 text-xs text-slate-500">{p.desc}</p>
          </button>
        ))}
      </div>
      <button className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95">
        <Save className="h-4 w-4" /> Assign {selected} Plan
      </button>
    </div>
  );
}

function EmailTab() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  return (
    <div>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          // EMAIL
        </p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-800">
          Send Email
        </h2>
        <p className="text-sm text-slate-500">
          Compose and send a message to this member
        </p>
      </div>
      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Subject
          </label>
          <input
            type="text"
            placeholder="Email subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Message
          </label>
          <textarea
            placeholder="Write your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95">
          <Mail className="h-4 w-4" /> Send Email
        </button>
      </div>
    </div>
  );
}

function StatusHistoryTab({ history }) {
  const colors = {
    active: "bg-emerald-400",
    inactive: "bg-slate-300",
    suspended: "bg-red-400",
  };
  return (
    <div>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          // STATUS HISTORY
        </p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-800">
          Account Status Timeline
        </h2>
      </div>
      <div className="relative rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="absolute left-[2.35rem] top-8 bottom-8 w-0.5 bg-slate-100" />
        <div className="space-y-6">
          {history.map((h, i) => (
            <div key={i} className="flex items-start gap-4">
              <div
                className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${colors[h.status] || "bg-slate-300"} shadow-sm`}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                      STATUS_COLORS[h.status]
                    }`}
                  >
                    {h.status}
                  </span>
                  <span className="text-xs text-slate-400">{h.date}</span>
                  <span className="text-xs text-slate-400">• by {h.by}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{h.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function MemberDetailPage({ member = DUMMY_MEMBER, onBack }) {
  const [activeTab, setActiveTab] = useState("company");

  const tabContent = {
    company: <CompanyTab data={member.company} />,
    contacts: <ContactsTab contacts={member.contacts} />,
    addresses: <AddressesTab addresses={member.addresses} />,
    currentplan: <CurrentPlanTab plan={member.currentPlan} />,
    assignplan: <AssignPlanTab />,
    email: <EmailTab />,
    statushistory: <StatusHistoryTab history={member.statusHistory} />,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* ── Back + Breadcrumb ── */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-1.5 text-sm text-slate-400">
          <span className="cursor-pointer hover:text-blue-600">Members</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="cursor-pointer hover:text-blue-600">Profile</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-slate-700">
            {member.company.name}
          </span>
        </div>
      </div>

      {/* ── Profile header ── */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {/* Top strip */}
        <div className="h-1.5 w-full bg-linear-to-r from-blue-500 via-violet-500 to-blue-400" />

        <div className="flex flex-wrap items-center gap-5 p-5">
          {/* Avatar */}
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold ${member.company.color}`}
          >
            {member.company.initials}
          </div>

          {/* Name + status */}
          <div className="flex-1 min-w-45">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {member.company.name}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  STATUS_COLORS[member.status]
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    member.status === "active"
                      ? "bg-emerald-500"
                      : member.status === "suspended"
                      ? "bg-red-500"
                      : "bg-slate-400"
                  }`}
                />
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Meta info chips */}
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {[
              {
                icon: Building2,
                label: "Company",
                value: member.company.name,
              },
              {
                icon: Layers,
                label: "Business Type",
                value: member.company.businessType,
              },
              {
                icon: Calendar,
                label: "Join Date",
                value: member.joinDate,
              },
              { icon: Wifi, label: "Join IP", value: member.joinIp },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2 text-center"
              >
                <div className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {item.value}
                </p>
              </div>
            ))}

            {/* Plan badge */}
            <div className="flex flex-col items-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                Current Plan
              </p>
              <span className="mt-0.5 rounded-md bg-violet-700 px-2.5 py-0.5 text-xs font-bold text-white">
                {member.plan}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab navigation ── */}
      <div className="mb-5 flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-100 bg-white p-1 shadow-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div>{tabContent[activeTab]}</div>
    </div>
  );
}
