/* eslint-disable */
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export function SidebarLinks(props) {
  const location = useLocation();
  const { routes, collapsed, onNavLinkClick } = props;

  const [openMenus, setOpenMenus] = useState({});
  const [flyout, setFlyout] = useState(null);

  useEffect(() => {
    if (!collapsed) setFlyout(null);
  }, [collapsed]);

  useEffect(() => {
    setFlyout(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!flyout) return;
    const close = (e) => {
      if (
        !e.target.closest("[data-sidebar-flyout]") &&
        !e.target.closest("[data-sidebar-flyout-trigger]")
      ) {
        setFlyout(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [flyout]);

  const activeRoute = (path, layout) => {
    const fullPath = (layout + "/" + path).replace(/\/+/g, "/").replace(/\/$/, "");
    const currentPath = location.pathname.replace(/\/$/, "");
    return currentPath === fullPath;
  };

  const isChildActive = (children, layout) => {
    return children?.some((child) => activeRoute(child.path, layout));
  };

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const openFlyout = (e, route) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyout((prev) =>
      prev?.route?.name === route.name
        ? null
        : { route, top: rect.top, left: rect.right + 8 }
    );
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl" ||
        route.layout === "/staff"
      ) {
        if (route.children && route.children.length > 0) {
          const childActive = isChildActive(route.children, route.layout);
          const isOpen = openMenus[route.name] ?? childActive;

          if (collapsed) {
            return (
              <div key={index} className="relative mb-1">
                <div
                  data-sidebar-flyout-trigger
                  className={`group relative flex cursor-pointer items-center justify-center rounded-xl px-1 py-2.5 transition-all duration-300 ${
                    childActive
                      ? "bg-brand-50/50 dark:bg-navy-800"
                      : "hover:bg-gray-100/40 dark:hover:bg-white/5"
                  }`}
                  onClick={(e) => openFlyout(e, route)}
                  title={route.name}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-[14px] transition-all duration-300 ${
                      childActive
                        ? "bg-[#003366] text-white shadow-lg shadow-brand-900/40"
                        : "bg-white dark:bg-navy-900 text-gray-500 dark:text-gray-400 shadow-sm"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="relative mb-2">
              <div
                className={`group relative flex cursor-pointer items-center justify-between rounded-2xl px-3 py-3 transition-all duration-300 ${
                  childActive
                    ? "bg-brand-50/50 dark:bg-navy-800"
                    : "hover:bg-gray-100/40 dark:hover:bg-white/5"
                }`}
                onClick={() => toggleMenu(route.name)}
              >
                <div className="flex items-center">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-[14px] transition-all duration-500 ${
                      childActive
                        ? "bg-[#003366] text-white shadow-lg shadow-brand-900/40 rotate-[360deg]"
                        : "bg-white dark:bg-navy-900 text-gray-500 dark:text-gray-400 group-hover:scale-110 shadow-sm"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}
                  </span>
                  <p
                    className={`ml-3 text-[13px] font-black tracking-tight transition-colors transition-all ${
                      childActive
                        ? "text-brand-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {route.name}
                  </p>
                </div>
                <div
                  className={`p-1 rounded-lg transition-all duration-300 ${
                    isOpen ? "bg-brand-100/50 dark:bg-navy-900 text-brand-600" : "text-gray-400"
                  }`}
                >
                  {isOpen ? (
                    <MdKeyboardArrowDown className="h-4 w-4" />
                  ) : (
                    <MdKeyboardArrowRight className="h-4 w-4" />
                  )}
                </div>
              </div>

              {isOpen && (
                <div className={`relative ml-9 mt-1 space-y-1.5 transition-all duration-500`}>
                  <div className="absolute -left-4 top-0 bottom-6 w-0.5 bg-gradient-to-b from-[#7C5CFF] via-[#5B8CFF] to-transparent dark:from-[#9A86FF] dark:via-[#6EA8FF]" />

                  {route.children.map((child, ci) => {
                    const isActive = activeRoute(child.path, route.layout);
                    return (
                      <Link
                        key={ci}
                        to={route.layout + "/" + child.path}
                        className="block group/item"
                        onClick={() => onNavLinkClick?.()}
                      >
                        <div
                          className={`relative flex items-center justify-between rounded-xl px-4 py-2 transition-all duration-300 ${
                            isActive
                              ? "bg-brand-100/30 dark:bg-brand-900/10"
                              : "hover:bg-gray-100/30 dark:hover:bg-white/5"
                          }`}
                        >
                          <div
                            className={`absolute -left-4 top-1/2 -translate-y-1/2 h-0.5 transition-all duration-300 ${
                              isActive
                                ? "w-4 bg-gradient-to-r from-[#6F4BFF] to-[#4F9CFF] dark:from-[#9A86FF] dark:to-[#6EA8FF]"
                                : "w-3 bg-slate-300 dark:bg-slate-600"
                            }`}
                          />

                          <p
                            className={`text-xs transition-all duration-300 ${
                              isActive
                                ? "font-black text-brand-600 dark:text-white translate-x-1"
                                : "font-bold text-gray-500 dark:text-gray-400 group-hover/item:text-brand-400 group-hover/item:translate-x-1"
                            }`}
                          >
                            {child.name}
                          </p>

                          {isActive && (
                            <div className="h-1 w-1 rounded-full bg-brand-600 animate-ping" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        const isActive = activeRoute(route.path, route.layout);
        return (
          <Link
            key={index}
            to={route.layout + "/" + route.path}
            className={`mb-2 block ${collapsed ? "flex justify-center" : ""}`}
            title={route.name}
            onClick={() => onNavLinkClick?.()}
          >
            <div
              className={`group relative flex items-center rounded-2xl py-3 transition-all duration-300 ${
                collapsed ? "justify-center px-1" : "px-3"
              } ${
                isActive
                  ? "bg-brand-50/50 dark:bg-navy-800/80 shadow-sm"
                  : "hover:bg-gray-100/40 dark:hover:bg-white/5"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] transition-all duration-500 ${
                  isActive
                    ? "bg-[#003366] text-white shadow-lg shadow-brand-900/40"
                    : "bg-white dark:bg-navy-900 text-gray-400 dark:text-gray-500 group-hover:scale-110 shadow-sm"
                }`}
              >
                {route.icon ? route.icon : <DashIcon />}
              </span>
              {!collapsed && (
                <p
                  className={`ml-3 text-[13px] font-black tracking-tight transition-all ${
                    isActive
                      ? "text-brand-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-brand-500"
                  }`}
                >
                  {route.name}
                </p>
              )}

              {!collapsed && isActive && (
                <div className="absolute right-0 h-5 w-1 rounded-l-full bg-brand-600 shadow-[0_0_15px_rgba(0,51,102,0.8)]" />
              )}
            </div>
          </Link>
        );
      }
      return null;
    });
  };

  const flyoutEl =
    flyout &&
    flyout.route &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        data-sidebar-flyout
        className="fixed z-[300] w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-xl dark:border-white/10 dark:bg-navy-800"
        style={{
          top:
            typeof window !== "undefined"
              ? Math.max(8, Math.min(flyout.top, window.innerHeight - 280))
              : flyout.top,
          left:
            typeof window !== "undefined"
              ? Math.min(flyout.left, window.innerWidth - 240)
              : flyout.left,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <p className="border-b border-gray-100 px-3 pb-2 text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:border-white/10 dark:text-gray-500">
          {flyout.route.name}
        </p>
        <div className="max-h-[min(70vh,calc(100vh-8rem))] overflow-y-auto overscroll-y-contain py-1">
          {flyout.route.children.map((child, ci) => {
            const isActive = activeRoute(child.path, flyout.route.layout);
            return (
              <Link
                key={ci}
                to={flyout.route.layout + "/" + child.path}
                onClick={() => {
                  setFlyout(null);
                  onNavLinkClick?.();
                }}
                className={`block px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-50 text-[#003366] dark:bg-navy-900 dark:text-cyan-300"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                }`}
              >
                {child.name}
              </Link>
            );
          })}
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <div className={`space-y-1 ${collapsed ? "space-y-0" : ""}`}>{createLinks(routes)}</div>
      {flyoutEl}
    </>
  );
}

export default SidebarLinks;
