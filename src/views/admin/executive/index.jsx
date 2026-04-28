import React, { useState } from "react";
import BarChart from "components/charts/BarChart";
import LineChart from "components/charts/LineChart";
import PieChart from "components/charts/PieChart";
import Card from "components/card";
import Widget from "components/widget/Widget";
import Dropdown from "components/dropdown";
import ExecutiveTaskCard from "./components/ExecutiveTaskCard";
import { MdAttachMoney, MdTrendingUp, MdAccountBalanceWallet, MdShowChart, MdKeyboardArrowDown, MdOutlineLocationOn, MdOutlineBusiness, MdTune, MdCheck, MdOutlineFilterList } from "react-icons/md";
import {
  getBarChartOptions,
  getLineChartOptions,
  getComparisonBarChartOptions,
  getPieChartOptions,
  dashboardData,
} from "./variables/charts";

const METRIC_LABELS = { revenue: "Revenue", expense: "Expense", profit: "Profit" };

const ExecutiveDashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState("Kochi");
  const [metric, setMetric] = useState("revenue");
  
  const [compareBranchA, setCompareBranchA] = useState("Kochi");
  const [compareBranchB, setCompareBranchB] = useState("Trivandrum");

  const [chartType, setChartType] = useState("line"); // line, area, bar
  const [visibleSeries, setVisibleSeries] = useState(["Actual", "Expected", "Budget"]);
  const [timeframe, setTimeframe] = useState("All"); // Month, Year, All

  const toggleSeries = (s) => {
    setVisibleSeries(prev => 
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  // ─── KPI Data ───────────────────────────────────────────────────────────────
  const kpiData = dashboardData.branchDetails[selectedBranch].kpi;

  // ─── Hero Chart ─────────────────────────────────────────────────────────────
  const trendData = dashboardData.branchDetails[selectedBranch].trend[metric];
  
  let sliceStart = 0;
  if (timeframe === "Month") sliceStart = -2;
  else if (timeframe === "Year") sliceStart = -12;
  
  const slicedMonths = dashboardData.months.slice(sliceStart);

  const baseSeries = [
    { name: "Actual", data: trendData.actual.slice(sliceStart) },
    { name: "Expected", data: trendData.expected.slice(sliceStart) },
    { name: "Budget", data: trendData.budget.slice(sliceStart) },
  ];

  const heroSeries = baseSeries.filter(s => visibleSeries.includes(s.name));
  
  let heroOptions;
  if (chartType === "bar") {
    heroOptions = {
      ...getBarChartOptions(slicedMonths),
      plotOptions: { bar: { horizontal: false, columnWidth: "55%", borderRadius: 4 } },
      xaxis: { ...getBarChartOptions(slicedMonths).xaxis, labels: { style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" } } },
      yaxis: { show: true, labels: { formatter: (val) => `₹${val}k`, style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" } } }
    };
  } else {
    heroOptions = {
      ...getLineChartOptions(slicedMonths),
      chart: { ...getLineChartOptions(slicedMonths).chart, type: chartType === "area" ? "area" : "line" },
      fill: chartType === "area" ? { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3, stops: [0, 90, 100] } } : { opacity: 1 }
    };
  }


  // ─── Head-to-Head Comparison Data ─────────────────────────────────────────
  const branchAData = dashboardData.branchDetails[compareBranchA].compareData;
  const branchBData = dashboardData.branchDetails[compareBranchB].compareData;

  // ─── Secondary Charts ───────────────────────────────────────────────────────
  const productMixSeries = dashboardData.branchDetails[selectedBranch].productMix;
  const productMixOptions = getPieChartOptions(dashboardData.products);

  const expenseSeries = [
    {
      name: "Expenses",
      data: dashboardData.branchDetails[selectedBranch].expenseBreakdown,
    },
  ];
  const expenseOptions = getBarChartOptions(dashboardData.expenses);

  const taskMetrics = dashboardData.branchDetails[selectedBranch].taskMetrics;

  return (
    <div className="pt-2">
      {/* ── Master Filter Bar ── */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-[20px] bg-white p-5 shadow-sm border border-gray-100 dark:bg-navy-800 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-[#003366] dark:text-white">Executive Control</h2>
          <p className="text-sm text-gray-400">Filters apply to all charts below</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Metric Toggle — pill-style */}
          <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-navy-900">
            {["revenue", "expense", "profit"].map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${
                  metric === m
                    ? "bg-white text-[#003366] shadow dark:bg-navy-700 dark:text-white"
                    : "text-gray-500 hover:text-[#003366] dark:text-gray-400"
                }`}
              >
                {METRIC_LABELS[m]}
              </button>
            ))}
          </div>

          {/* Custom Branch Selector Dropdown */}
          <Dropdown
            button={
              <button className="flex items-center justify-between gap-2 w-full md:w-44 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-600 transition-colors hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-brand-700 dark:bg-brand-400/10 dark:text-brand-400 dark:hover:bg-brand-400/20">
                <span className="flex items-center"><MdOutlineLocationOn className="mr-1.5 text-lg" /> {selectedBranch}</span>
                <MdKeyboardArrowDown className="text-xl" />
              </button>
            }
            animation="origin-top right-0 mt-12 w-full md:w-44"
            classNames="py-2 top-0 -left-0 w-full md:w-44 rounded-xl bg-white shadow-xl dark:bg-navy-700 border border-gray-100 dark:border-white/10"
          >
            <div className="flex flex-col gap-1 px-2">

              {dashboardData.branches.map((branch) => (
                <button
                  key={branch}
                  onClick={() => setSelectedBranch(branch)}
                  className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedBranch === branch
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                  }`}
                >
                  <MdOutlineLocationOn className="mr-2 text-lg" /> {branch}
                </button>
              ))}
            </div>
          </Dropdown>
        </div>
      </div>

      {/* ── KPI Strip ── */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Widget icon={<MdAttachMoney />} title={"Today's Gold Rate"} subtitle={kpiData.goldRate} detail={"Updated daily"} trend={"+1.2%"} />
        <Widget
          icon={<MdAccountBalanceWallet />}
          title={"Total Customers"}
          subtitle={kpiData.customers}
          detail={selectedBranch === "All Branches" ? "Across all branches" : `${selectedBranch} branch`}
          trend={"+5.4%"}
        />
        <Widget icon={<MdTrendingUp />} title={"Active Loans"} subtitle={kpiData.aum} detail={"Portfolio value"} trend={"+12%"} />
        <Widget icon={<MdShowChart />} title={"Total Revenue"} subtitle={kpiData.revenue} detail={"This quarter"} trend={"+8.5%"} />
      </div>

      {/* ── Large Hero Chart ── */}
      <Card extra="mb-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
          <div>
            <h3 className="text-xl font-bold text-[#003366] dark:text-white capitalize">
              {selectedBranch} Branch · {METRIC_LABELS[metric]} Trend
            </h3>
            <p className="text-sm text-gray-400">Month-by-month Actual vs. Budget</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Timeframe Selector Pills */}
            <div className="hidden lg:flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-navy-900/50 mr-2 border border-gray-100 dark:border-white/10">
              {["Month", "Year", "All"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition-all capitalize ${
                    timeframe === t
                      ? "bg-white text-brand-500 shadow-sm dark:bg-navy-700 dark:text-white"
                      : "text-gray-400 hover:text-brand-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Chart Type Selector Pills */}
            <div className="hidden lg:flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-navy-900/50 mr-2 border border-gray-100 dark:border-white/10">
              {["line", "area", "bar"].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition-all capitalize ${
                    chartType === type
                      ? "bg-white text-brand-500 shadow-sm dark:bg-navy-700 dark:text-white"
                      : "text-gray-400 hover:text-brand-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <Dropdown
              button={
                <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-[#003366] transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-navy-800 dark:text-white">
                  <MdTune className="text-lg" />
                  <span>Filters</span>
                </button>
              }
              animation="origin-top right-0 mt-3 w-56"
              classNames="py-3 top-0 -left-0 w-56 rounded-2xl bg-white shadow-2xl dark:bg-navy-800 border border-gray-100 dark:border-white/10"
            >
              <div className="flex flex-col px-4 py-2">
                <span className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Select Branch</span>
                <div className="grid grid-cols-1 gap-1 mb-4 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {dashboardData.branches.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBranch(b)}
                      className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        selectedBranch === b
                          ? "bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400"
                          : "text-gray-600 hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center"><MdOutlineLocationOn className="mr-2" /> {b}</span>
                      {selectedBranch === b && <MdCheck />}
                    </button>
                  ))}
                </div>

                <span className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 border-t border-gray-100 dark:border-white/10 pt-4">Data Series</span>
                <div className="flex flex-col gap-2">
                  {["Actual", "Expected", "Budget"].map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSeries(s)}
                      className="flex items-center justify-between text-sm font-medium text-gray-600 dark:text-white hover:text-brand-500 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${
                          s === "Actual" ? "bg-[#4318FF]" : s === "Expected" ? "bg-[#39B8FF]" : "bg-[#6AD2FF]"
                        }`} />
                        {s}
                      </div>
                      <div className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
                        visibleSeries.includes(s) 
                          ? "border-brand-500 bg-brand-500 text-white" 
                          : "border-gray-200 dark:border-white/20"
                      }`}>
                        {visibleSeries.includes(s) && <MdCheck className="text-xs" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="h-[450px] w-full">
          {chartType === "bar" ? (
            <BarChart chartData={heroSeries} chartOptions={heroOptions} />
          ) : (
            <LineChart series={heroSeries} options={heroOptions} />
          )}
        </div>
      </Card>

      {/* ── Head-to-Head Comparison ── */}
      <Card extra="mb-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#003366] dark:text-white">Head-to-Head Comparison</h3>
            <p className="text-sm text-gray-400">Direct comparison of key metrics</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Dropdown
              button={
                <button className="flex items-center justify-between gap-2 w-32 sm:w-40 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 sm:px-4 text-xs sm:text-sm font-bold text-brand-600 transition-colors hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-brand-700 dark:bg-brand-400/10 dark:text-brand-400 dark:hover:bg-brand-400/20">
                  <span className="flex items-center"><MdOutlineLocationOn className="mr-1 text-lg" /> {compareBranchA}</span>
                  <MdKeyboardArrowDown className="text-xl" />
                </button>
              }
              animation="origin-top right-0 mt-12 w-32 sm:w-40"
              classNames="py-2 top-0 -left-0 w-32 sm:w-40 rounded-xl bg-white shadow-xl dark:bg-navy-700 border border-gray-100 dark:border-white/10"
            >
              <div className="flex flex-col gap-1 px-2">
                {dashboardData.branches.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => setCompareBranchA(branch)}
                    className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      compareBranchA === branch
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                    }`}
                  >
                    <MdOutlineLocationOn className="mr-2 text-lg" /> {branch}
                  </button>
                ))}
              </div>
            </Dropdown>
            
            <span className="text-gray-400 font-bold px-1 text-sm">VS</span>
            
            <Dropdown
              button={
                <button className="flex items-center justify-between gap-2 w-32 sm:w-40 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 sm:px-4 text-xs sm:text-sm font-bold text-brand-600 transition-colors hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-brand-700 dark:bg-brand-400/10 dark:text-brand-400 dark:hover:bg-brand-400/20">
                  <span className="flex items-center"><MdOutlineLocationOn className="mr-1 text-lg" /> {compareBranchB}</span>
                  <MdKeyboardArrowDown className="text-xl" />
                </button>
              }
              animation="origin-top right-0 mt-12 w-32 sm:w-40"
              classNames="py-2 top-0 -left-0 w-32 sm:w-40 rounded-xl bg-white shadow-xl dark:bg-navy-700 border border-gray-100 dark:border-white/10"
            >
              <div className="flex flex-col gap-1 px-2">
                {dashboardData.branches.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => setCompareBranchB(branch)}
                    className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      compareBranchB === branch
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                    }`}
                  >
                    <MdOutlineLocationOn className="mr-2 text-lg" /> {branch}
                  </button>
                ))}
              </div>
            </Dropdown>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-navy-900/50 text-[#003366] dark:text-white text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Metric / Detail</th>
                <th className="px-6 py-4">{compareBranchA}</th>
                <th className="px-6 py-4">{compareBranchB}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Total Revenue</td>
                <td className="px-6 py-4 font-bold text-green-600">{branchAData.totalRevenue}</td>
                <td className="px-6 py-4 font-bold text-green-600">{branchBData.totalRevenue}</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Total Profit</td>
                <td className="px-6 py-4 text-brand-500 font-bold">{branchAData.totalProfit}</td>
                <td className="px-6 py-4 text-brand-500 font-bold">{branchBData.totalProfit}</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Top Product</td>
                <td className="px-6 py-4">{branchAData.topProduct}</td>
                <td className="px-6 py-4">{branchBData.topProduct}</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Highest Expense</td>
                <td className="px-6 py-4 text-red-500">{branchAData.highestExpense}</td>
                <td className="px-6 py-4 text-red-500">{branchBData.highestExpense}</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Staff Count</td>
                <td className="px-6 py-4">{branchAData.staffCount}</td>
                <td className="px-6 py-4">{branchBData.staffCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Secondary Analytics & Tasks ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card extra="p-6 h-full">
          <div className="mb-2">
            <h4 className="text-lg font-bold text-[#003366] dark:text-white">Product Mix</h4>
            <p className="text-sm text-gray-400">
              {selectedBranch === "All Branches" ? "All branches combined" : `${selectedBranch} branch`}
            </p>
          </div>
          <div className="h-[250px] flex justify-center items-center">
            <PieChart series={productMixSeries} options={productMixOptions} />
          </div>
        </Card>

        <Card extra="p-6 h-full">
          <div className="mb-2">
            <h4 className="text-lg font-bold text-[#003366] dark:text-white">Expense Breakdown</h4>
            <p className="text-sm text-gray-400">
              {selectedBranch === "All Branches" ? "All branches combined" : `${selectedBranch} branch`}
            </p>
          </div>
          <div className="h-[250px]">
            <BarChart chartData={expenseSeries} chartOptions={expenseOptions} />
          </div>
        </Card>

        <ExecutiveTaskCard metrics={taskMetrics} branch={selectedBranch} />
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
