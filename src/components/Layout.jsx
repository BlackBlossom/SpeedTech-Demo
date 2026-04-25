import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Globe,
  Server,
  Monitor,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  CreditCard,
  HelpCircle,
  ShieldCheck,
  X,
  Menu,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// NAV STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { id: "dashboard",  icon: LayoutDashboard, label: "Dashboard"          },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "members",      icon: Users,   label: "Members"      },
    ],
  },
];

const NOTIFICATIONS = [
  { id: 1, text: "New member registered",       time: "2m ago",   unread: true  },
  { id: 2, text: "Invoice #1042 overdue",        time: "18m ago",  unread: true  },
  { id: 3, text: "Server usage spike on VPS-3",  time: "1h ago",   unread: true  },
  { id: 4, text: "Support ticket #88 replied",   time: "3h ago",   unread: false },
  { id: 5, text: "Domain apex-tech.in renewed",  time: "Yesterday",unread: false },
];

const SIDEBAR_COLLAPSED_STORAGE_KEY = "layout.sidebar.collapsed";

// ─────────────────────────────────────────────────────────────────────────────
// TOOLTIP (for collapsed sidebar)
// ─────────────────────────────────────────────────────────────────────────────
function Tooltip({ label, children }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2.5 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white shadow-xl">
          {label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV ITEM
// ─────────────────────────────────────────────────────────────────────────────
function NavItem({ item, active, collapsed, onClick }) {
  const el = (
    <button
      onClick={() => onClick(item.id)}
      className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
        active
          ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {/* Active indicator bar */}
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-blue-300" />
      )}

      <item.icon
        className={`h-4.5 w-4.5 shrink-0 transition-transform duration-150 ${
          active ? "text-white" : "text-slate-500 group-hover:text-white"
        }`}
      />

      {/* Label — fades when collapsed */}
      <span
        className={`truncate transition-all duration-200 ${
          collapsed ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"
        }`}
      >
        {item.label}
      </span>

      {/* Active dot when collapsed */}
      {active && collapsed && (
        <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-300" />
      )}
    </button>
  );

  return collapsed ? <Tooltip label={item.label}>{el}</Tooltip> : el;
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATION PANEL
// ─────────────────────────────────────────────────────────────────────────────
function NotificationPanel({ onClose }) {
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;
  return (
    <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">Notifications</span>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* List */}
      <ul className="divide-y divide-slate-50">
        {NOTIFICATIONS.map((n) => (
          <li
            key={n.id}
            className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 ${
              n.unread ? "bg-blue-50/40" : ""
            }`}
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                n.unread ? "bg-blue-500" : "bg-transparent"
              }`}
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${n.unread ? "font-semibold text-slate-800" : "text-slate-600"}`}>
                {n.text}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="border-t border-slate-100 px-4 py-2.5 text-center">
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
          View all notifications →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({ collapsed, onToggle, activeNav, onNav, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 flex flex-col bg-slate-950 transition-all duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "w-17.5" : "w-60"}
        `}
      >
        {/* ── Logo ── */}
        <div className={`flex h-16 shrink-0 items-center border-b border-slate-800/60 transition-all duration-300 ${collapsed ? "justify-center px-0" : "gap-3 px-5"}`}>
          {/* Icon mark — always visible */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-[13px] font-black text-white shadow-lg shadow-blue-900/40">
            ST
          </div>

          {/* Wordmark — hidden when collapsed */}
          <div className={`overflow-hidden transition-all duration-200 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
            <p className="whitespace-nowrap text-[15px] font-bold tracking-wide text-white">
             Speed<span className="text-blue-400">Tech</span>
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
              Admin Panel
            </p>
          </div>

          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className={`ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white lg:hidden ${collapsed ? "hidden" : ""}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Toggle button (desktop) ── */}
        <button
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`
            absolute -right-3 top-18 z-40 hidden h-6 w-6 items-center justify-center
            rounded-full border border-slate-700 bg-slate-900 text-slate-400
            shadow-md transition-all duration-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white
            lg:flex
          `}
        >
          {collapsed
            ? <ChevronRight className="h-3 w-3" />
            : <ChevronLeft  className="h-3 w-3" />
          }
        </button>

        {/* ── Nav sections ── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-none">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-5">
              {/* Section label */}
              <div className={`mb-1.5 overflow-hidden transition-all duration-200 ${collapsed ? "h-0 opacity-0" : "h-auto opacity-100"}`}>
                <p className="px-4 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                  {section.label}
                </p>
              </div>

              {/* Collapsed divider */}
              {collapsed && (
                <div className="mx-4 mb-2 border-t border-slate-800" />
              )}

              <div className="space-y-0.5 px-2">
                {section.items.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    active={activeNav === item.id}
                    collapsed={collapsed}
                    onClick={onNav}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* ── User profile ── */}
        <div className={`shrink-0 border-t border-slate-800/60 p-3`}>
          {collapsed ? (
            <Tooltip label="Admin — Logout">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 transition-colors hover:bg-red-900/40 hover:text-red-400 mx-auto text-slate-400"
                onClick={() => {}}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-800/60">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                A
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">Admin</p>
                <p className="truncate text-[10px] text-slate-500">Superadmin</p>
              </div>
              <button
                title="Logout"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-900/40 hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────────
function Topbar({ breadcrumb, onMobileMenuOpen }) {
  const [notifOpen, setNotifOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;
  const notifRef = useRef(null);

  // Close notification panel on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-100 bg-white px-5">
      {/* Mobile hamburger */}
      <button
        onClick={onMobileMenuOpen}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Breadcrumb */}
      <nav className="hidden items-center gap-1.5 text-sm sm:flex">
        {breadcrumb.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-300" />}
            <span
              className={
                i === breadcrumb.length - 1
                  ? "font-semibold text-slate-800"
                  : "text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <div className={`flex items-center overflow-hidden rounded-xl border transition-all duration-200 ${searchOpen ? "w-56 border-blue-300 bg-white ring-2 ring-blue-100" : "w-8 border-transparent"}`}>
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-500 hover:text-blue-600 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
          {searchOpen && (
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent pr-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              onBlur={() => setSearchOpen(false)}
            />
          )}
        </div>

        {/* Notification bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className={`relative flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
              notifOpen ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white ring-2 ring-white">
                {unread}
              </span>
            )}
          </button>
          {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">Admin</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Superadmin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT  (default export — wrap your pages with this)
// ─────────────────────────────────────────────────────────────────────────────
export default function Layout({ children, activeNav = "members", onNav, breadcrumb = ["Dashboard"] }) {
  const [collapsed,   setCollapsed]   = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === "true";
    } catch {
      return true; // Default to collapsed if storage is unavailable (private mode / restricted storage).
    }
  });
  const [mobileOpen,  setMobileOpen]  = useState(false); // default to closed on mobile
  const [currentNav,  setCurrentNav]  = useState(activeNav);

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(collapsed));
    } catch {
      // Ignore storage write failures (private mode / restricted storage).
    }
  }, [collapsed]);

  const handleNav = (id) => {
    setCurrentNav(id);
    setMobileOpen(false);
    onNav && onNav(id);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans antialiased">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        activeNav={currentNav}
        onNav={handleNav}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          breadcrumb={breadcrumb}
          onMobileMenuOpen={() => setMobileOpen(true)}
        />

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
