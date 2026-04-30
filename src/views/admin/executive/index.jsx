import React, { useState } from "react";
import BarChart from "components/charts/BarChart";
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
  getTrendData,
  formatCurrency,
} from "./variables/charts";

const METRIC_LABELS = { revenue: "Revenue", expense: "Expense", profit: "Profit" };

const renderPercentage = (current, previous, isExpense = false) => {
  if (!previous) return null;
  const diff = current - previous;
  const percent = (diff / previous) * 100;
  if (percent === 0) return null;

  const isPositive = percent > 0;
  const isGood = isExpense ? !isPositive : isPositive;

  const colorClass = isGood
    ? "text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400"
    : "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400";
  const sign = isPositive ? "+" : "";

  return (
    <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${colorClass}`}>
      {sign}{percent.toFixed(1)}%
    </span>
  );
};

const ExecutiveDashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [metric, setMetric] = useState("revenue");
  const [tableFilter, setTableFilter] = useState("All");
  const [visibleSeries, setVisibleSeries] = useState(["Actual", "Expected", "Budget"]);
  const [timeframe, setTimeframe] = useState("All"); // Month, Year, All

  const toggleSeries = (s) => {
    setVisibleSeries(prev =>
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  // ─── KPI Data ───────────────────────────────────────────────────────────────
  const kpiData = selectedBranch === "All Branches"
    ? dashboardData.aggregate.kpi
    : dashboardData.branchDetails[selectedBranch].kpi;

  // ─── Hero Chart ─────────────────────────────────────────────────────────────
  const trendData = getTrendData(selectedBranch, metric, timeframe);

  const baseSeries = [
    { name: "Actual", data: trendData.actual },
    { name: "Expected", data: trendData.expected },
    { name: "Budget", data: trendData.budget },
  ];

  const heroSeries = baseSeries.filter(s => visibleSeries.includes(s.name));

  const heroOptions = {
    ...getBarChartOptions(trendData.categories),
    plotOptions: { bar: { horizontal: false, columnWidth: "55%", borderRadius: 4 } },
    xaxis: {
      ...getBarChartOptions(trendData.categories).xaxis,
      tickAmount: undefined,
      labels: {
        style: { colors: "#A3AED0", fontSize: "11px", fontWeight: "500" },
        hideOverlappingLabels: false,
        rotate: trendData.categories.length > 12 ? -45 : 0,
        rotateAlways: trendData.categories.length > 12,
      }
    },
    yaxis: { show: true, labels: { formatter: (val) => formatCurrency(val), style: { colors: "#A3AED0", fontSize: "12px", fontWeight: "500" } } }
  };


  // ─── Branch Performance Table Data ────────────────────────────────────────
  const branchTableData = dashboardData.branches.map(branch => {
    const revData = dashboardData.branchDetails[branch].trend.revenue.actual;
    const expData = dashboardData.branchDetails[branch].trend.expense.actual;

    // Scale by 10000 to match the Cr/L scaling used everywhere else
    const currentRev = (revData[revData.length - 1] || 0) * 10000;
    const prevRev = (revData[revData.length - 2] || 0) * 10000;

    const currentExp = (expData[expData.length - 1] || 0) * 10000;
    const prevExp = (expData[expData.length - 2] || 0) * 10000;

    return { name: branch, currentRev, prevRev, currentExp, prevExp };
  });

  let filteredTableData = [...branchTableData];
  if (tableFilter === "All") {
    filteredTableData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (tableFilter === "High Revenue") {
    filteredTableData.sort((a, b) => b.currentRev - a.currentRev);
    filteredTableData = filteredTableData.slice(0, 5);
  } else if (tableFilter === "High Expenses") {
    filteredTableData.sort((a, b) => b.currentExp - a.currentExp);
    filteredTableData = filteredTableData.slice(0, 5);
  }

  const top5Revenue = [...branchTableData].sort((a, b) => b.currentRev - a.currentRev).slice(0, 5);
  const bottom5Revenue = [...branchTableData].sort((a, b) => a.currentRev - b.currentRev).slice(0, 5);

  // ─── Secondary Charts ───────────────────────────────────────────────────────
  const productMixSeries = (selectedBranch === "All Branches"
    ? dashboardData.aggregate.productMix
    : dashboardData.branchDetails[selectedBranch].productMix).map(v => v * 10000);
  const productMixOptions = getPieChartOptions(dashboardData.products);

  const expenseSeries = [
    {
      name: "Expenses",
      data: (selectedBranch === "All Branches"
        ? dashboardData.aggregate.expenseBreakdown
        : dashboardData.branchDetails[selectedBranch].expenseBreakdown).map(v => v * 10000),
    },
  ];
  const expenseOptions = getBarChartOptions(dashboardData.expenses);

  const taskMetrics = selectedBranch === "All Branches"
    ? dashboardData.aggregate.taskMetrics
    : dashboardData.branchDetails[selectedBranch].taskMetrics;

  return (
    <div className="pt-2">
      {/* ── Master Filter Bar ── */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-[20px] bg-white p-5 shadow-sm border border-gray-100 dark:bg-navy-800 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-[#003366] dark:text-white">Executive Control</h2>
          <p className="text-sm text-gray-400">Filters apply to all charts below</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">

          {/* Custom Branch Selector Dropdown */}
          <Dropdown
            button={
              <button className="flex items-center justify-between gap-2 w-full md:w-44 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-600 transition-colors hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-brand-700 dark:bg-brand-400/10 dark:text-brand-400 dark:hover:bg-brand-400/20">
                <span className="flex items-center">
                  {selectedBranch === "All Branches" ? <><MdOutlineBusiness className="mr-1.5 text-lg" /> All Branches</> : <><MdOutlineLocationOn className="mr-1.5 text-lg" /> {selectedBranch}</>}
                </span>
                <MdKeyboardArrowDown className="text-xl" />
              </button>
            }
            animation="origin-top right-0 mt-12 w-full md:w-44"
            classNames="py-2 top-0 -left-0 w-full md:w-44 rounded-xl bg-white shadow-xl dark:bg-navy-700 border border-gray-100 dark:border-white/10"
          >
            <div className="flex flex-col gap-1 px-2">
              <button
                onClick={() => setSelectedBranch("All Branches")}
                className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedBranch === "All Branches"
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                  }`}
              >
                <MdOutlineBusiness className="mr-2 text-lg" /> All Branches
              </button>
              {dashboardData.branches.map((branch) => (
                <button
                  key={branch}
                  onClick={() => setSelectedBranch(branch)}
                  className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedBranch === branch
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
        <Widget icon={<MdShowChart />} title={"Total Revenue"} subtitle={kpiData.revenue} detail={"This quarter"} trend={"+8.5%"} />
        <Widget icon={<MdAttachMoney />} title={"Total Expenses"} subtitle={kpiData.expenses} detail={"Updated daily"} trend={"+1.2%"} />
        <Widget
          icon={<MdAccountBalanceWallet />}
          title={"Total Customers"}
          subtitle={kpiData.customers}
          detail={selectedBranch === "All Branches" ? "Across all branches" : `${selectedBranch} branch`}
          trend={"+5.4%"}
        />
        <Widget icon={<MdTrendingUp />} title={"Active Loans"} subtitle={kpiData.aum} detail={"Portfolio value"} trend={"+12%"} />

      </div>

      {/* ── Top/Bottom Revenue Branches ── */}
      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card extra="p-6">
          <h3 className="mb-4 text-lg font-bold text-[#003366] dark:text-white">Top 5 Revenue Branches</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="border-b border-gray-200 dark:border-white/10 text-xs uppercase text-gray-400 tracking-wider">
                <tr>
                  <th className="py-3">Branch</th>
                  <th className="py-3">Current Revenue</th>
                  <th className="py-3">Previous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {top5Revenue.map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 font-bold text-gray-900 dark:text-white">
                      <div className="flex items-center gap-1">
                        <MdOutlineLocationOn className="text-brand-500" /> {row.name}
                      </div>
                    </td>
                    <td className="py-3 font-bold text-green-600">
                      <div className="flex items-center">
                        {formatCurrency(row.currentRev)}
                        {renderPercentage(row.currentRev, row.prevRev, false)}
                      </div>
                    </td>
                    <td className="py-3 font-medium text-gray-500">{formatCurrency(row.prevRev)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card extra="p-6">
          <h3 className="mb-4 text-lg font-bold text-[#003366] dark:text-white">Bottom 5 Revenue Branches</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="border-b border-gray-200 dark:border-white/10 text-xs uppercase text-gray-400 tracking-wider">
                <tr>
                  <th className="py-3">Branch</th>
                  <th className="py-3">Current Revenue</th>
                  <th className="py-3">Previous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {bottom5Revenue.map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 font-bold text-gray-900 dark:text-white">
                      <div className="flex items-center gap-1">
                        <MdOutlineLocationOn className="text-brand-500" /> {row.name}
                      </div>
                    </td>
                    <td className="py-3 font-bold text-green-600">
                      <div className="flex items-center">
                        {formatCurrency(row.currentRev)}
                        {renderPercentage(row.currentRev, row.prevRev, false)}
                      </div>
                    </td>
                    <td className="py-3 font-medium text-gray-500">{formatCurrency(row.prevRev)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
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

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Toggle — pill-style */}
            <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-navy-900">
              {["revenue", "expense", "profit"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${metric === m
                      ? "bg-white text-[#003366] shadow dark:bg-navy-700 dark:text-white"
                      : "text-gray-500 hover:text-[#003366] dark:text-gray-400"
                    }`}
                >
                  {METRIC_LABELS[m]}
                </button>
              ))}
            </div>

            {/* Timeframe Selector Pills */}
            <div className="hidden lg:flex items-center gap-1 rounded-lg bg-gray-50 p-1 dark:bg-navy-900/50 mr-2 border border-gray-100 dark:border-white/10">
              {["All", "Years", "Quarters", "Months"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition-all capitalize ${timeframe === t
                      ? "bg-white text-brand-500 shadow-sm dark:bg-navy-700 dark:text-white"
                      : "text-gray-400 hover:text-brand-500"
                    }`}
                >
                  {t}
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
              classNames="py-3 top-0 -left-15 w-56 rounded-2xl bg-white shadow-2xl dark:bg-navy-800 border border-gray-100 dark:border-white/10"
            >
              <div className="flex flex-col px-4 py-2">
                <span className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Select Branch</span>
                <div className="grid grid-cols-1 gap-1 mb-4 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  <button
                    onClick={() => setSelectedBranch("All Branches")}
                    className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedBranch === "All Branches"
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-white dark:hover:bg-white/5"
                      }`}
                  >
                    <span className="flex items-center"><MdOutlineBusiness className="mr-2" /> All Branches</span>
                    {selectedBranch === "All Branches" && <MdCheck />}
                  </button>
                  {dashboardData.branches.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBranch(b)}
                      className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${selectedBranch === b
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
                        <div className={`h-2.5 w-2.5 rounded-full ${s === "Actual" ? "bg-[#4318FF]" : s === "Expected" ? "bg-[#39B8FF]" : "bg-[#6AD2FF]"
                          }`} />
                        {s}
                      </div>
                      <div className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${visibleSeries.includes(s)
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
        <div className="h-[450px] w-full overflow-hidden">
          <BarChart chartData={heroSeries} chartOptions={heroOptions} />
        </div>
      </Card>

      {/* ── Branch Performance Matrix ── */}
      <Card extra="mb-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#003366] dark:text-white">Branch Performance</h3>
            <p className="text-sm text-gray-400">Current vs Previous Month tracking</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-navy-900">
              {["All", "High Revenue", "High Expenses"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTableFilter(f)}
                  className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${tableFilter === f
                      ? "bg-white text-[#003366] shadow dark:bg-navy-700 dark:text-white"
                      : "text-gray-500 hover:text-[#003366] dark:text-gray-400"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/10">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-navy-900/50 text-[#003366] dark:text-white text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Branch</th>
                <th className="px-6 py-4">Current Revenue</th>
                <th className="px-6 py-4">Previous Revenue</th>
                <th className="px-6 py-4">Current Expense</th>
                <th className="px-6 py-4">Previous Expense</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              {filteredTableData.map((row) => (
                <tr key={row.name} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MdOutlineLocationOn className="text-brand-500 text-lg" /> {row.name}
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    <div className="flex items-center">
                      {formatCurrency(row.currentRev)}
                      {renderPercentage(row.currentRev, row.prevRev, false)}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-green-600/70">{formatCurrency(row.prevRev)}</td>
                  <td className="px-6 py-4 font-bold text-red-500">
                    <div className="flex items-center">
                      {formatCurrency(row.currentExp)}
                      {renderPercentage(row.currentExp, row.prevExp, true)}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-red-500/70">{formatCurrency(row.prevExp)}</td>
                </tr>
              ))}
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
            <PieChart key={selectedBranch} series={productMixSeries} options={productMixOptions} />
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
