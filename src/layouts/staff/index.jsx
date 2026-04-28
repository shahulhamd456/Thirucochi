import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import staffRoutes from "../../routesStaff.jsx";

const SIDEBAR_COLLAPSED_KEY = "finance-crm-sidebar-collapsed";

export default function Staff(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [currentRoute, setCurrentRoute] = React.useState("Dashboard");

  const toggleSidebarCollapsed = React.useCallback(() => {
    setSidebarCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  React.useEffect(() => {
    getActiveRoute(staffRoutes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Dashboard";
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.children && route.children.length > 0) {
        for (let j = 0; j < route.children.length; j++) {
          const child = route.children[j];
          if (window.location.href.indexOf("/staff/" + child.path) !== -1) {
            setCurrentRoute(child.name);
            return child.name;
          }
        }
      } else {
        if (
          window.location.href.indexOf(route.layout + "/" + route.path) !== -1
        ) {
          setCurrentRoute(route.name);
          return route.name;
        }
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes) => {
    const routeElements = [];
    routes.forEach((prop, key) => {
      if (prop.layout === "/staff") {
        if (prop.children && prop.children.length > 0) {
          prop.children.forEach((child, ci) => {
            routeElements.push(
              <Route
                path={`/${child.path}`}
                element={child.component}
                key={`${key}-${ci}`}
              />
            );
          });
        } else {
          routeElements.push(
            <Route
              path={`/${prop.path}`}
              element={prop.component}
              key={key}
            />
          );
        }
      }
    });
    return routeElements;
  };

  document.documentElement.dir = "ltr";
  
  return (
    <div className="flex h-full w-full">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebarCollapsed}
        routes={staffRoutes}
      />
      {/* Navbar & Main Content */}
      <div className="h-full w-full min-h-screen bg-white dark:bg-navy-900 transition-colors">
        {/* Subtle Background Accent */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 overflow-hidden">
           <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#003366] blur-[150px]" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0055aa] blur-[150px]" />
        </div>

        {/* Main Content */}
        <main
          className={`relative z-10 mx-4 h-full flex-none pt-4 transition-all duration-300 sm:mx-5 md:pr-2 ${
            sidebarCollapsed ? "xl:ml-[92px]" : "xl:ml-[296px]"
          }`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Finance CRM"}
              brandText={currentRoute}
              secondary={getActiveNavbar(staffRoutes)}
              {...rest}
            />
            <div className="mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2 pt-6">
              <Routes>
                {getRoutes(staffRoutes)}
                <Route
                  path="/settings"
                  element={<Navigate to="/staff/settings/profile" replace />}
                />
                <Route
                  path="/"
                  element={<Navigate to="/staff/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3 mt-10">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
