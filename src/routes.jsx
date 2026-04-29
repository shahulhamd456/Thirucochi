import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Customers from "views/admin/customers";
import Leads from "views/admin/leads";
import MutualFunds from "views/admin/investments/mutual-funds";
import SIP from "views/admin/investments/sip";
import LumpSum from "views/admin/investments/lump-sum";
import Portfolio from "views/admin/portfolio";
import LifeInsurance from "views/admin/insurance/life";
import GeneralInsurance from "views/admin/insurance/general";
import FixedDeposits from "views/admin/fixed-deposits";
import Transactions from "views/admin/transactions";
import Staff from "views/admin/staff";
import Performance from "views/admin/performance";
import Expenses from "views/admin/expenses";
import Reports from "views/admin/reports";
import Notifications from "views/admin/notifications";
import ExecutiveDashboard from "views/admin/executive";
import ProfileSettings from "views/admin/settings/ProfileSettings";
import NotificationSettings from "views/admin/settings/NotificationSettings";
import ThemeSettings from "views/admin/settings/ThemeSettings";
import SecuritySettings from "views/admin/settings/SecuritySettings";

// Icon Imports
import {
  MdHome,
  MdPeople,
  MdLeaderboard,
  MdTrendingUp,
  MdAccountBalanceWallet,
  MdShield,
  MdSavings,
  MdReceipt,
  MdGroup,
  MdBarChart,
  MdAttachMoney,
  MdAssessment,
  MdNotifications,
  MdSettings,
} from "react-icons/md";

const routes = [
  {
    name: "Executive Dashboard",
    layout: "/admin",
    path: "executive",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <ExecutiveDashboard />,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Customers",
    layout: "/admin",
    path: "customers",
    icon: <MdPeople className="h-6 w-6" />,
    component: <Customers />,
  },
  {
    name: "Leads",
    layout: "/admin",
    path: "leads",
    icon: <MdLeaderboard className="h-6 w-6" />,
    component: <Leads />,
  },
  {
    name: "Investments",
    layout: "/admin",
    path: "investments",
    icon: <MdTrendingUp className="h-6 w-6" />,
    children: [
      {
        name: "Mutual Funds",
        path: "investments/mutual-funds",
        component: <MutualFunds />,
      },
      {
        name: "SIP",
        path: "investments/sip",
        component: <SIP />,
      },
      {
        name: "Lump Sum",
        path: "investments/lump-sum",
        component: <LumpSum />,
      },
    ],
  },
  {
    name: "Portfolio",
    layout: "/admin",
    path: "portfolio",
    icon: <MdAccountBalanceWallet className="h-6 w-6" />,
    component: <Portfolio />,
  },
  {
    name: "Insurance",
    layout: "/admin",
    path: "insurance",
    icon: <MdShield className="h-6 w-6" />,
    children: [
      {
        name: "Life",
        path: "insurance/life",
        component: <LifeInsurance />,
      },
      {
        name: "General",
        path: "insurance/general",
        component: <GeneralInsurance />,
      },
    ],
  },
  {
    name: "Fixed Deposits",
    layout: "/admin",
    path: "fixed-deposits",
    icon: <MdSavings className="h-6 w-6" />,
    component: <FixedDeposits />,
  },
  {
    name: "Transactions",
    layout: "/admin",
    path: "transactions",
    icon: <MdReceipt className="h-6 w-6" />,
    component: <Transactions />,
  },
  {
    name: "Staff",
    layout: "/admin",
    path: "staff",
    icon: <MdGroup className="h-6 w-6" />,
    component: <Staff />,
  },
  {
    name: "Performance & Targets",
    layout: "/admin",
    path: "performance",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Performance />,
  },
  {
    name: "Expenses",
    layout: "/admin",
    path: "expenses",
    icon: <MdAttachMoney className="h-6 w-6" />,
    component: <Expenses />,
  },
  {
    name: "Reports",
    layout: "/admin",
    path: "reports",
    icon: <MdAssessment className="h-6 w-6" />,
    component: <Reports />,
  },
  {
    name: "Notifications",
    layout: "/admin",
    path: "notifications",
    icon: <MdNotifications className="h-6 w-6" />,
    component: <Notifications />,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "settings",
    icon: <MdSettings className="h-6 w-6" />,
    children: [
      {
        name: "Profile",
        path: "settings/profile",
        component: <ProfileSettings />,
      },
      {
        name: "Notification Settings",
        path: "settings/notifications",
        component: <NotificationSettings />,
      },
      {
        name: "Theme",
        path: "settings/theme",
        component: <ThemeSettings />,
      },
      {
        name: "Security",
        path: "settings/security",
        component: <SecuritySettings />,
      },
    ],
  },
];

export default routes;
