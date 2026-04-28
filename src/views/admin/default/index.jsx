import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import DashboardStatStrip from "views/admin/default/components/DashboardStatStrip";
import {
  MdTrendingUp, MdShield, MdSavings, MdPeople, MdAccountBalanceWallet, MdAssessment
} from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useFetchJson } from "hooks/useFetchJson";
import { API } from "api/endpoints";

const Dashboard = () => {
  const checkRows = useFetchJson(API.dashboardTableCheck, tableDataCheck);
  const complexRows = useFetchJson(API.dashboardTableComplex, tableDataComplex);

  return (
    <div className="pt-2">
      <DashboardStatStrip />

      {/* Financial Performance Overview */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
        <Widget
          icon={<MdTrendingUp />}
          title={"Mutual Fund AUM"}
          subtitle={"Rs 24.8 Cr"}
          detail={"1,240 Active Folios"}
          trend={"+12.5%"}
        />
        <Widget
          icon={<MdSavings />}
          title={"SIP Book Monthly"}
          subtitle={"Rs 38.5 L"}
          detail={"Live SIP Count: 850"}
          trend={"+8.2%"}
        />
        <Widget
          icon={<MdShield />}
          title={"Insurance Premium"}
          subtitle={"Rs 12.4 L"}
          detail={"General & Life Policies"}
          trend={"+15%"}
        />
        <Widget
          icon={<MdPeople />}
          title={"Total Clients"}
          subtitle={"3,420"}
          detail={"New this month: 42"}
          trend={"+4%"}
        />
        <Widget
          icon={<MdAccountBalanceWallet />}
          title={"Fixed Deposits"}
          subtitle={"Rs 5.2 Cr"}
          detail={"Corporate & Bank FD"}
          trend={"+2.4%"}
        />
        <Widget
          icon={<MdAssessment />}
          title={"Claims Registered"}
          subtitle={"Rs 2.8 L"}
          detail={"Settlement Ratio: 98%"}
          trend={"-1.2%"}
        />
      </div>

      {/* Main Analysis Section */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:items-start">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-navy-800">
          <TotalSpent />
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-navy-800">
          <WeeklyRevenue />
        </div>
      </div>

      {/* Detailed Tables & Distribution */}
      <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Portfolio Check Table */}
        <div className="xl:col-span-8">
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={checkRows}
          />
        </div>

        {/* Product Mix & Traffic */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Performance Tracking */}
        <div className="xl:col-span-8">
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={complexRows}
          />
        </div>

        {/* Goals & Calendar */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          <TaskCard />
          <div className="bg-white dark:bg-navy-800 p-2 rounded-[24px] shadow-2xl shadow-brand-500/5 border border-white dark:border-white/5">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
