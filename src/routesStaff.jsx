import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Customers from "views/admin/customers";
import Leads from "views/admin/leads";
import Notifications from "views/admin/notifications";
import ProfileSettings from "views/admin/settings/ProfileSettings";

// Icon Imports
import {
  MdHome,
  MdPeople,
  MdLeaderboard,
  MdNotifications,
  MdSettings,
} from "react-icons/md";

const staffRoutes = [
  {
    name: "Dashboard",
    layout: "/staff",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Customers",
    layout: "/staff",
    path: "customers",
    icon: <MdPeople className="h-6 w-6" />,
    component: <Customers />,
  },
  {
    name: "Leads",
    layout: "/staff",
    path: "leads",
    icon: <MdLeaderboard className="h-6 w-6" />,
    component: <Leads />,
  },
  {
    name: "Notifications",
    layout: "/staff",
    path: "notifications",
    icon: <MdNotifications className="h-6 w-6" />,
    component: <Notifications />,
  },
  {
    name: "Profile Settings",
    layout: "/staff",
    path: "settings/profile",
    icon: <MdSettings className="h-6 w-6" />,
    component: <ProfileSettings />,
  },
];

export default staffRoutes;
