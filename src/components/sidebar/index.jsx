/* eslint-disable */
import React from "react";
import { FiLogOut, FiBriefcase, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import Links from "./components/Links";
import defaultRoutes from "routes.jsx";

import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ open, onClose, collapsed = false, onToggleCollapsed, routes = defaultRoutes }) => {
  const { user, logout } = useAuth();
  React.useEffect(() => {
    if (!open || !onClose) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        role="presentation"
        className={`fixed inset-0 z-40 bg-navy-900/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <div
        className={`fixed left-0 top-0 !z-50 flex h-screen max-h-screen flex-col pb-4 transition-all duration-300 ease-out xl:!z-0 xl:translate-x-0 ${open ? "translate-x-0" : "-translate-x-96"
          } ${collapsed ? "w-[280px] xl:w-[76px]" : "w-[280px]"}`}
      >
        <div className="absolute inset-0 bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl border-r border-gray-100 dark:border-white/5 shadow-2xl shadow-gray-200/50 dark:shadow-none" />

        <div className="relative z-10 flex h-full min-h-0 flex-col">
          <div
            className={`flex shrink-0 items-center pb-6 pt-8 ${collapsed ? "xl:flex-col xl:gap-3 xl:px-2 xl:pt-6" : "justify-between px-6"}`}
          >
            <div
              className={`flex min-w-0 items-center gap-3 ${collapsed ? "xl:w-full xl:flex-col xl:justify-center" : ""}`}
            >
              <div
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl shadow-lg shadow-brand-500/20 transition-transform hover:rotate-6"
                style={{ background: "linear-gradient(135deg, #003366 0%, #0055aa 100%)" }}
              >
                <FiBriefcase className="text-xl text-white" />
              </div>
              <div className={`min-w-0 ${collapsed ? "hidden xl:hidden" : ""}`}>
                <p className="text-sm font-black uppercase leading-tight tracking-tighter text-brand-900 dark:text-white">
                  Finance CRM
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-brand-500/80">Advisor Console</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose?.();
                }}
                className="flex rounded-xl border border-gray-200 bg-gray-50 p-2 text-gray-600 transition-all hover:bg-gray-100 active:scale-95 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700 xl:hidden"
                title="Close menu"
                aria-label="Close menu"
              >
                <FiX className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCollapsed?.();
                }}
                className={`hidden rounded-xl border border-gray-200 bg-gray-50 p-2 text-[#003366] transition-all hover:bg-gray-100 active:scale-95 dark:border-white/10 dark:bg-navy-800 dark:text-cyan-300 dark:hover:bg-navy-700 xl:flex ${collapsed ? "xl:mt-1" : ""
                  }`}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!collapsed}
              >
                {collapsed ? <FiChevronRight className="h-4 w-4" /> : <FiChevronLeft className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mb-4 shrink-0 px-4" />

          <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-3 pb-2">
            <div
              className={`mb-4 flex items-center justify-between px-3 ${collapsed ? "xl:hidden" : ""}`}
            >
              <p className="text-[11px] font-black uppercase tracking-[3px] text-gray-400 dark:text-gray-500">
                Service Suite
              </p>
              <div className="ml-4 h-px flex-1 bg-gray-100 dark:bg-white/5" />
            </div>

            <Links routes={routes} collapsed={!!collapsed} onNavLinkClick={onClose} />
          </div>

          <div className={`mt-auto shrink-0 px-4 pb-4 ${collapsed ? "xl:px-2" : ""}`}>
            <div
              className={`group relative flex items-center justify-between rounded-[45px] bg-[#0b1437]/90 p-2 shadow-2xl backdrop-blur-xl border border-white/5 transition-all duration-300 hover:bg-[#0b1437] ${collapsed ? "xl:flex-col xl:gap-4 xl:rounded-3xl xl:py-4 xl:px-2" : ""
                }`}
            >
              <div className={`flex items-center gap-3 ${collapsed ? "xl:flex-col" : ""}`}>
                <div className="relative shrink-0">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"}
                    className={`h-11 w-11 rounded-[32px] object-cover transition-transform duration-500 group-hover:scale-105 shadow-inner ${collapsed ? "xl:h-12 xl:w-12 xl:rounded-2xl" : ""}`}
                    alt="Profile"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-[#0b1437] bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                </div>
                <div className={`min-w-0 ${collapsed ? "hidden" : "block"}`}>
                  <p className="truncate text-sm font-bold text-white leading-tight">{user?.name || 'Robert Brown'}</p>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Verified Advisor</p>
                </div>
              </div>

              <button
                onClick={() => logout()}
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-red-500/10 hover:text-red-500 active:scale-90 ${collapsed ? "xl:h-10 xl:w-10" : "mr-2"
                  }`}
                title="Sign out"
              >
                <FiLogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
