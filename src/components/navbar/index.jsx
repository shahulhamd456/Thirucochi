import React from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdOutlineVerifiedUser,
  MdOutlineAccountCircle,
  MdOutlineTask,
  MdOutlineSettings,
  MdWorkspacePremium,
} from "react-icons/md";
import { loadNotifications, markAllNotificationsReadAsync } from "utils/notificationStore";
import { loadRecentSearches, addRecentSearchAsync } from "utils/recentSearchStore";
import { readUiPrefs, patchUiPrefs } from "utils/uiPreferences";

const QUICK_LINKS = [
  { label: "Dashboard", to: "/admin/default" },
  { label: "Customers", to: "/admin/customers" },
  { label: "Leads", to: "/admin/leads" },
  { label: "Transactions", to: "/admin/transactions" },
  { label: "Reports", to: "/admin/reports" },
];

import { useAuth } from "../../contexts/AuthContext";

const Navbar = (props) => {
  const { onOpenSidenav, brandText, logoText } = props;
  const { user, logout } = useAuth();
  const [darkmode, setDarkmode] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [notifications, setNotifications] = React.useState([]);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [recent, setRecent] = React.useState([]);
  const searchWrapRef = React.useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const q = new URLSearchParams(location.search).get("q") || "";
    setSearchValue(q);
  }, [location.search]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const [n, r] = await Promise.all([loadNotifications(), loadRecentSearches()]);
      if (!cancelled) {
        setNotifications(n);
        setRecent(r);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [location.search]);

  React.useEffect(() => {
    if (!searchOpen) return;
    const fn = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [searchOpen]);

  React.useEffect(() => {
    setDarkmode(readUiPrefs().dark);
    const onPrefs = (e) => {
      if (e?.detail && typeof e.detail.dark === "boolean") {
        setDarkmode(e.detail.dark);
      } else {
        setDarkmode(readUiPrefs().dark);
      }
    };
    window.addEventListener("finance-crm-ui-prefs", onPrefs);
    return () => window.removeEventListener("finance-crm-ui-prefs", onPrefs);
  }, []);

  const onGlobalSearch = () => {
    const q = searchValue.trim();
    if (q) {
      addRecentSearchAsync(q).then(setRecent);
    }
    const params = new URLSearchParams(location.search);
    if (q) params.set("q", q);
    else params.delete("q");
    navigate(`${location.pathname}?${params.toString()}`);
    setSearchOpen(false);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Determine dynamic paths
  const isStaff = location.pathname.startsWith("/staff");
  const layoutPrefix = isStaff ? "/staff" : "/admin";
  const leadsPath = `${layoutPrefix}/leads`;
  const profilePath = `${layoutPrefix}/settings/profile`;

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between gap-4 rounded-3xl border border-white bg-white/60 p-3 shadow-xl shadow-gray-200/20 backdrop-blur-2xl dark:border-white/5 dark:bg-[#0b14374d]">
      <div className="ml-[6px] flex min-w-0 flex-1 flex-wrap items-center gap-4">
        <span
          className="flex shrink-0 cursor-pointer rounded-xl p-2 text-gray-600 transition-all hover:bg-white dark:text-white dark:hover:bg-navy-700 xl:hidden"
          onClick={onOpenSidenav}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onOpenSidenav?.()}
          aria-label="Open menu"
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="mb-0.5 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[3px] text-brand-500">
              {logoText || "Finance CRM"}
            </span>
            <span className="text-[10px] text-gray-300 dark:text-gray-500">/</span>
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 dark:text-gray-300">
              {brandText}
            </span>
          </div>
          <p className="shrink text-[28px] font-black uppercase leading-none tracking-tighter text-brand-900 dark:text-white">
            {brandText}
          </p>
        </div>

        <Link
          to={leadsPath}
          className="hidden shrink-0 items-center gap-2 rounded-full border border-cyan-500/25 bg-[#003366]/10 px-3 py-2 text-xs font-semibold text-[#003366] transition-colors hover:bg-[#003366]/15 dark:bg-cyan-500/10 dark:text-cyan-200 dark:hover:bg-cyan-500/15 lg:inline-flex"
        >
          <span className="text-gray-500 dark:text-gray-400">Today</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span>New contacts</span>
          <span className="rounded-full bg-[#06B6D4] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">27</span>
        </Link>
      </div>

      <div className="relative flex flex-1 flex-wrap items-center justify-end gap-3 md:flex-none">
        <div ref={searchWrapRef} className="relative hidden w-full min-w-0 md:block md:w-64 lg:w-72">
          <div className="flex h-11 w-full cursor-text items-center rounded-2xl border border-gray-200 bg-white/80 px-3 transition-all focus-within:ring-2 focus-within:ring-[#003366]/20 group dark:border-white/10 dark:bg-navy-900/80">
            <FiSearch className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-focus-within:text-[#003366] dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search customers, leads, or accounts..."
              className="crm-search-input block h-full w-full pl-3 !bg-transparent text-xs font-bold text-navy-700 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
              autoComplete="off"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onGlobalSearch();
              }}
            />
          </div>
          {searchOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[60] max-h-[min(70vh,320px)] overflow-y-auto rounded-2xl border border-gray-100 bg-white py-3 shadow-2xl dark:border-white/10 dark:bg-navy-800">
              <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Recently searched</p>
              {recent.length === 0 ? (
                <p className="px-4 text-xs text-gray-500">No recent searches yet. Press Enter to search.</p>
              ) : (
                <ul className="mb-3 space-y-0.5">
                  {recent.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                        onClick={() => {
                          setSearchValue(item);
                          const params = new URLSearchParams(location.search);
                          params.set("q", item);
                          navigate(`${location.pathname}?${params.toString()}`);
                          setSearchOpen(false);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mb-2 mt-1 border-t border-gray-50 px-4 pt-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:border-white/10">
                Quick links
              </p>
              <ul className="space-y-0.5">
                {QUICK_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="block px-4 py-2 text-xs font-semibold text-[#003366] hover:bg-brand-50/80 dark:text-cyan-300 dark:hover:bg-white/5"
                      onClick={() => setSearchOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/50 p-1 dark:border-white/10 dark:bg-navy-800/60">
          <Dropdown
            button={
              <div className="relative cursor-pointer rounded-xl p-2 text-gray-500 transition-all hover:bg-white dark:text-white dark:hover:bg-navy-700">
                <IoMdNotificationsOutline className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#06B6D4] px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
            }
            animation="origin-top-right transition-all duration-300 ease-in-out"
            children={
              <div className="flex w-[min(100vw-2rem,22rem)] flex-col rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-white/10 dark:bg-navy-800">
                <div className="flex items-center justify-between border-b border-gray-50 px-4 py-3 dark:border-white/10">
                  <div>
                    <p className="text-sm font-bold text-brand-900 dark:text-white">Notifications</p>
                    <p className="text-[10px] font-medium text-gray-400">
                      {unreadCount > 0 ? `${unreadCount} new` : "You are up to date"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => markAllNotificationsReadAsync().then(setNotifications)}
                    className="text-[10px] font-bold uppercase tracking-wide text-[#06B6D4] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 space-y-1 overflow-y-auto px-2 py-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex gap-3 rounded-xl p-2.5 transition-colors ${
                        n.read ? "opacity-75 hover:bg-gray-50 dark:hover:bg-white/5" : "bg-brand-50/60 dark:bg-navy-900/80"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                          n.type === "success"
                            ? "bg-emerald-500"
                            : n.type === "warning"
                              ? "bg-amber-500"
                              : "bg-[#003366]"
                        }`}
                      >
                        {n.initial}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-brand-900 dark:text-white">{n.name}</p>
                        <p className="line-clamp-2 text-[11px] font-medium text-gray-600 dark:text-gray-300">{n.title}</p>
                        {n.desc ? (
                          <p className="mt-0.5 line-clamp-1 text-[10px] text-gray-400 dark:text-gray-500">{n.desc}</p>
                        ) : null}
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-50 p-2 dark:border-white/10">
                  <Link
                    to={`${layoutPrefix}/notifications`}
                    className="block rounded-xl py-2.5 text-center text-xs font-bold text-[#003366] hover:bg-gray-50 dark:text-cyan-300 dark:hover:bg-white/5"
                    onClick={() => setSearchOpen(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            }
            classNames={"py-2 top-12 -left-[200px] md:-left-[240px] w-max"}
          />

          <div
            className="cursor-pointer rounded-xl p-2 text-gray-500 transition-all hover:bg-white dark:text-white dark:hover:bg-navy-700"
            onClick={() => {
              const next = patchUiPrefs({ dark: !readUiPrefs().dark });
              setDarkmode(next.dark);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const next = patchUiPrefs({ dark: !readUiPrefs().dark });
                setDarkmode(next.dark);
              }
            }}
          >
            {darkmode ? <RiSunFill className="h-5 w-5" /> : <RiMoonFill className="h-5 w-5" />}
          </div>

          <Dropdown
            button={
              <div className="flex cursor-pointer items-center gap-2 rounded-xl p-1 pl-2 transition-all hover:bg-white dark:hover:bg-navy-700">
                <div className="hidden text-right sm:block">
                  <p className="text-[10px] font-black uppercase leading-none tracking-tighter text-brand-900 dark:text-white">
                    {user?.name?.split(' ').map(n => n[0]).join('. ') + user?.name?.split(' ').pop().slice(1) || 'User'}
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase leading-none tracking-widest text-gray-400">{user?.role || 'Guest'}</p>
                </div>
                <img
                  className="h-8 w-8 rounded-lg shadow-sm"
                  src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"}
                  alt=""
                />
              </div>
            }
            children={
              <div className="flex w-64 flex-col overflow-hidden rounded-2xl border border-gray-50 bg-white shadow-2xl dark:border-white/5 dark:bg-navy-800">
                <div className="flex items-center gap-3 border-b border-gray-50 p-4 dark:border-white/5">
                  <img
                    className="h-10 w-10 rounded-xl object-cover"
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"}
                    alt=""
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-brand-900 dark:text-white">{user?.name || 'User'}</p>
                    <p className="truncate text-xs text-gray-500">{user?.email || 'user@financecrm.com'}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 p-2">
                  <Link
                    to={profilePath}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                  >
                    <MdOutlineAccountCircle className="text-lg text-[#003366] dark:text-cyan-300" /> View profile
                  </Link>
                  <Link
                    to={leadsPath}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                  >
                    <MdOutlineTask className="text-lg text-[#003366] dark:text-cyan-300" /> My pipeline
                  </Link>
                  <Link
                    to={profilePath}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                  >
                    <MdOutlineSettings className="text-lg text-[#003366] dark:text-cyan-300" /> Account settings
                  </Link>
                  <div className="mx-1 my-2 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-[#003366]/5 to-cyan-500/10 p-3 dark:from-navy-900 dark:to-navy-800">
                    <div className="mb-2 flex items-center gap-2">
                      <MdWorkspacePremium className="text-lg text-[#06B6D4]" />
                      <p className="text-xs font-bold text-[#003366] dark:text-cyan-200">Upgrade to Pro</p>
                    </div>
                    <p className="mb-2 text-[10px] leading-relaxed text-gray-600 dark:text-gray-400">
                      Unlimited leads, advanced analytics, and priority support.
                    </p>
                    <button
                      type="button"
                      className="w-full rounded-lg bg-[#003366] py-2 text-[10px] font-bold uppercase tracking-wide text-white hover:bg-[#0a4a82]"
                    >
                      Upgrade now
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    Log out
                  </button>
                </div>
              </div>
            }
            classNames={"py-2 top-12 -left-[180px] w-max"}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
