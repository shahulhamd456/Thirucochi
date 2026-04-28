import React from "react";
import Card from "components/card";
import { DT_WRAP, DT_TABLE, DT_TH, TD, TD_1, TD_END } from "utils/dataTableStyles";
import Widget from "components/widget/Widget";
import {
  MdAccountBalanceWallet,
  MdSavings,
  MdTrendingUp,
  MdOutlineTimeline,
} from "react-icons/md";

const LumpSum = () => {
  const oneTimeInvestments = [
    { fund: "HDFC Flexi Cap Fund", date: "2026-01-12", amount: "Rs 5,00,000", nav: "72.14", value: "Rs 5,62,000" },
    { fund: "ICICI Prudential Bluechip", date: "2025-11-08", amount: "Rs 3,00,000", nav: "58.77", value: "Rs 3,28,500" },
    { fund: "SBI Small Cap Fund", date: "2025-09-22", amount: "Rs 2,50,000", nav: "110.32", value: "Rs 2,96,300" },
    { fund: "Kotak Equity Opportunities", date: "2025-07-03", amount: "Rs 4,00,000", nav: "49.28", value: "Rs 4,34,400" },
  ];

  return (
    <div className="pt-2">
      <div className="mb-6 flex items-center justify-end">
        <button className="rounded-lg bg-[#003366] px-5 py-2.5 text-sm font-semibold uppercase text-white shadow-sm transition-colors hover:bg-[#0a4a82]">
          Add Lump Sum
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Widget icon={<MdAccountBalanceWallet />} title="Total Deployed" subtitle="Rs 14.5 L" detail="Across 4 transactions" trend="+4" />
        <Widget icon={<MdTrendingUp />} title="Current Value" subtitle="Rs 16.21 L" detail="Mark-to-market" trend="+11.8%" />
        <Widget icon={<MdSavings />} title="Unrealized Gain" subtitle="Rs 1.71 L" detail="Absolute return" trend="+Rs 1.71 L" />
        <Widget icon={<MdOutlineTimeline />} title="Avg. Holding" subtitle="9.2 Months" detail="Weighted duration" trend="Stable" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <Card extra="h-full rounded-[32px] border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <h3 className="mb-6 text-lg font-semibold text-brand-900 dark:text-white">One-Time Investment Ledger</h3>
            <div className={DT_WRAP}>
              <table className={DT_TABLE}>
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/10">
                    <th className={DT_TH}>Fund</th>
                    <th className={DT_TH}>Date</th>
                    <th className={DT_TH}>Amount</th>
                    <th className={DT_TH}>NAV</th>
                    <th className={DT_TH}>Current Value</th>
                  </tr>
                </thead>
                <tbody>
                  {oneTimeInvestments.map((item) => (
                    <tr key={`${item.fund}-${item.date}`} className="group">
                      <td className={`${TD_1} text-sm font-semibold text-brand-900 dark:text-white`}>{item.fund}</td>
                      <td className={`${TD} text-sm font-medium tabular-nums text-gray-600 dark:text-gray-300`}>{item.date}</td>
                      <td className={`${TD} text-sm font-semibold text-brand-700 dark:text-brand-400`}>{item.amount}</td>
                      <td className={`${TD} text-sm font-medium tabular-nums text-gray-600 dark:text-gray-300`}>{item.nav}</td>
                      <td className={`${TD_END} text-sm font-semibold text-green-600 dark:text-green-400`}>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-4">
          <Card extra="rounded-xl border border-cyan-500/20 !bg-[#003366] p-6 text-white shadow-lg dark:!border-cyan-400/20 dark:!bg-[#061f3d]">
            <h4 className="mb-3 text-lg font-semibold">Allocation Insight</h4>
            <p className="text-xs text-brand-100/80 leading-relaxed">
              Consider splitting future lump sum entries across large cap and flexi cap funds to improve downside protection.
            </p>
          </Card>

          <Card extra="p-6">
            <h4 className="mb-4 text-lg font-semibold text-brand-900 dark:text-white">Upcoming Opportunities</h4>
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-50 dark:bg-navy-900 p-3">
                <p className="text-[10px] uppercase font-black text-gray-400">Rebalance Window</p>
                <p className="text-sm font-semibold text-brand-900 dark:text-white">May 2026</p>
              </div>
              <div className="rounded-lg bg-gray-50 dark:bg-navy-900 p-3">
                <p className="text-[10px] uppercase font-black text-gray-400">Suggested Add-On</p>
                <p className="text-sm font-semibold text-brand-900 dark:text-white">Rs 2,00,000</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LumpSum;
