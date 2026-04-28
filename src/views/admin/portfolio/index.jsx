import React, { useMemo, useState } from "react";
import Card from "components/card";
import { MdPieChart, MdTrendingUp, MdAccountBalance, MdHistory } from "react-icons/md";
import Widget from "components/widget/Widget";
import LineChart from "components/charts/LineChart";

const Portfolio = () => {
  const [projectionMode, setProjectionMode] = useState("growth");

  const assetAllocation = [
    { type: "Equity Mutual Funds", value: "Rs 2.4 Cr", color: "bg-brand-600" },
    { type: "Fixed Deposits", value: "Rs 85 L", color: "bg-green-500" },
    { type: "Direct Equity", value: "Rs 1.2 Cr", color: "bg-brand-400" },
    { type: "Insurance Cash Value", value: "Rs 45 L", color: "bg-orange-400" },
  ];

  const wealthProjectionSeries = useMemo(() => {
    if (projectionMode === "balanced") {
      return [
        {
          name: "Portfolio Value",
          data: [3.8, 3.95, 4.08, 4.18, 4.32, 4.46, 4.6, 4.74, 4.9],
          color: "#6AD2FF",
        },
        {
          name: "Invested Capital",
          data: [3.6, 3.72, 3.85, 3.96, 4.05, 4.16, 4.28, 4.41, 4.52],
          color: "#94A3B8",
        },
      ];
    }

    return [
      {
        name: "Portfolio Value",
        data: [3.8, 4.05, 4.26, 4.42, 4.62, 4.85, 5.08, 5.35, 5.62],
        color: "#4318FF",
      },
      {
        name: "Invested Capital",
        data: [3.6, 3.78, 3.94, 4.12, 4.28, 4.44, 4.6, 4.76, 4.93],
        color: "#94A3B8",
      },
    ];
  }, [projectionMode]);

  const wealthProjectionOptions = useMemo(
    () => ({
      chart: {
        id: "wealth-projection",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      colors:
        projectionMode === "growth"
          ? ["#4318FF", "#22C55E"]
          : ["#06B6D4", "#F59E0B"],
      stroke: {
        curve: "smooth",
        width: [4, 3],
        dashArray: [0, 6],
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: "#E2E8F0",
        strokeDashArray: 5,
        xaxis: { lines: { show: false } },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value) => `Rs ${value.toFixed(2)} Cr`,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          gradientToColors:
            projectionMode === "growth"
              ? ["#6D28D9", "#16A34A"]
              : ["#3B82F6", "#F97316"],
          opacityFrom: 0.45,
          opacityTo: 0.08,
          stops: [0, 95, 100],
        },
      },
      markers: {
        size: [3, 3],
        strokeWidth: 0,
        hover: { size: 8 },
      },
      xaxis: {
        categories: ["2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034"],
        labels: {
          style: {
            colors: "#94A3B8",
            fontSize: "12px",
            fontWeight: "600",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value.toFixed(1)} Cr`,
          style: {
            colors: "#94A3B8",
            fontSize: "12px",
            fontWeight: "600",
          },
        },
      },
      legend: {
        show: false,
      },
      theme: {
        mode: "light",
      },
    }),
    [projectionMode]
  );

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-brand-100 dark:border-white/10 text-xs font-black text-brand-900 dark:text-white uppercase hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              Download Report
            </button>
            <button className="px-6 py-2.5 bg-[#003366] text-white rounded-xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all">
              ADD ASSET
            </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdPieChart />} title="Net Worth" subtitle="Rs 4.94 Cr" detail="Est. Market Value" trend="+Rs 12L" />
        <Widget icon={<MdTrendingUp />} title="Annual ROI" subtitle="14.8%" detail="XIRR Performance" trend="+2.1%" />
        <Widget icon={<MdAccountBalance />} title="Liquid Cash" subtitle="Rs 14.2 L" detail="Available to Invest" trend="+Rs 2L" />
        <Widget icon={<MdHistory />} title="Risk Score" subtitle="Moderate" detail="Strategy: Balanced" trend="Stable" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Asset Allocation Card */}
        <div className="xl:col-span-4">
          <Card extra="p-6 h-full bg-white dark:bg-navy-800 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5">
            <h3 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight mb-8">Asset Allocation</h3>
            <div className="space-y-6">
              {assetAllocation.map((asset, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-black text-gray-500 dark:text-gray-300 uppercase tracking-tighter">{asset.type}</p>
                    <p className="text-sm font-black text-brand-900 dark:text-white">{asset.value}</p>
                  </div>
                  <div className="h-2 w-full bg-gray-50 dark:bg-navy-900 rounded-full overflow-hidden">
                    <div className={`h-full ${asset.color} rounded-full transition-all duration-1000 w-[70%] group-hover:w-[75%]`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 dark:border-white/5">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-[2px] leading-relaxed">
                  "Step into the world of Thirukochi. Your financial journey is more than just transactions; it's the path to realizing dreams."
                </p>
            </div>
          </Card>
        </div>

        {/* Growth Analytics Chart */}
        <div className="xl:col-span-8">
          <Card extra="p-6 h-full bg-white dark:bg-navy-800 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight">Wealth Projection</h3>
                <div className="flex gap-2">
                    <button
                      onClick={() => setProjectionMode("growth")}
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        projectionMode === "growth"
                          ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                          : "bg-gray-50 dark:bg-navy-900 text-gray-400 dark:text-gray-300 hover:text-brand-500"
                      }`}
                    >
                      Growth
                    </button>
                    <button
                      onClick={() => setProjectionMode("balanced")}
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        projectionMode === "balanced"
                          ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                          : "bg-gray-50 dark:bg-navy-900 text-gray-400 dark:text-gray-300 hover:text-brand-500"
                      }`}
                    >
                      Balanced
                    </button>
                </div>
            </div>
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-brand-100/70 dark:border-brand-500/20 bg-brand-50/60 dark:bg-brand-900/20 px-4 py-3">
                <p className="text-[10px] font-black text-brand-400 dark:text-brand-300 uppercase tracking-[2px]">Projected Value</p>
                <p className="text-sm font-black text-brand-700 dark:text-brand-200">Rs 5.62 Cr</p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-900 px-4 py-3">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-300 uppercase tracking-[2px]">Capital Invested</p>
                <p className="text-sm font-black text-gray-700 dark:text-white">Rs 4.93 Cr</p>
              </div>
              <div className="rounded-2xl border border-green-100 dark:border-green-500/30 bg-green-50/80 dark:bg-green-900/20 px-4 py-3">
                <p className="text-[10px] font-black text-green-500 dark:text-green-300 uppercase tracking-[2px]">Net Gain</p>
                <p className="text-sm font-black text-green-600 dark:text-green-300">+Rs 0.69 Cr</p>
              </div>
            </div>
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-brand-100/70 dark:border-white/10 bg-gradient-to-b from-brand-50/60 to-white dark:from-navy-900 dark:to-navy-800 p-4">
              <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-400/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />
              <LineChart options={wealthProjectionOptions} series={wealthProjectionSeries} />
            </div>
            <div className="mt-4 flex items-center gap-6 px-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wide">Portfolio Value</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wide">Invested Capital</p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-navy-900">
                    <p className="text-[9px] font-black text-gray-400 dark:text-gray-300 uppercase mb-1">Total Investment</p>
                    <p className="text-sm font-black text-brand-900 dark:text-white">Rs 3.82 Cr</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-navy-900">
                    <p className="text-[9px] font-black text-gray-400 dark:text-gray-300 uppercase mb-1">Current Value</p>
                    <p className="text-sm font-black text-brand-900 dark:text-white">Rs 4.94 Cr</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-navy-900">
                    <p className="text-[9px] font-black text-gray-400 dark:text-gray-300 uppercase mb-1">Total Abs. Return</p>
                    <p className="text-sm font-black text-green-500">+Rs 1.12 Cr</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-navy-900">
                    <p className="text-[9px] font-black text-gray-400 dark:text-gray-300 uppercase mb-1">Compounded Return</p>
                    <p className="text-sm font-black text-green-500">22.4%</p>
                </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
