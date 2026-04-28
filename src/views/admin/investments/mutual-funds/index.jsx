import React from "react";
import Card from "components/card";
import { DT_WRAP, DT_TABLE, DT_TH, TD, TD_1, TD_END } from "utils/dataTableStyles";
import { MdTrendingUp, MdShowChart, MdAttachMoney, MdOutlineAutoGraph } from "react-icons/md";
import Widget from "components/widget/Widget";

const MutualFunds = () => {
  const topFunds = [
    { name: "HDFC Top 100 Fund", returns: "18.5%", risk: "Very High", aum: "Rs 2.4 Cr" },
    { name: "SBI Bluechip Fund", returns: "16.2%", risk: "High", aum: "Rs 1.8 Cr" },
    { name: "ICICI Pru Bluechip", returns: "15.8%", risk: "Balanced", aum: "Rs 3.2 Cr" },
    { name: "Nippon India Growth", returns: "22.4%", risk: "Very High", aum: "Rs 1.1 Cr" },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <button className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all">
          INVEST NOW
        </button>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdTrendingUp />} title="Equity Funds" subtitle="Rs 18.2 Cr" detail="65% Allocation" trend="+14%" />
        <Widget icon={<MdShowChart />} title="Debt Funds" subtitle="Rs 4.5 Cr" detail="22% Allocation" trend="+6.5%" />
        <Widget icon={<MdAttachMoney />} title="Hybrid Funds" subtitle="Rs 2.1 Cr" detail="13% Allocation" trend="+9.2%" />
        <Widget icon={<MdOutlineAutoGraph />} title="Active SIPs" subtitle="842" detail="Rs 34.8 L per month" trend="+22%" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Market Insights */}
        <Card extra="p-6 bg-white dark:bg-navy-800 rounded-[24px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight">Market Insights</h3>
            <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full uppercase">Bullish</span>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-navy-900 border border-gray-100 dark:border-white/5">
              <p className="text-sm font-black text-brand-700 dark:text-brand-400 mb-2 uppercase tracking-tighter">Investment Strategy</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Step into the world of Thirukochi Financial Services. We recognize that your financial journey is more than just transactions; it's the path to realizing your life's dreams.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-900/20 border border-brand-100/50 dark:border-brand-900/30">
              <p className="text-sm font-black text-brand-900 dark:text-white mb-2 uppercase tracking-tighter">Why Mutual Funds & SIP?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Investment pools combining funds from multiple investors to diversify portfolios in stocks, bonds, or other securities, managed by professionals.
              </p>
            </div>
          </div>
        </Card>

        {/* Top Funds Table */}
        <Card extra="p-6 bg-white dark:bg-navy-800 rounded-[24px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5">
          <h3 className="mb-6 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">Top Performing Funds</h3>
          <div className={DT_WRAP}>
            <table className={DT_TABLE}>
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10">
                  <th className={DT_TH}>Fund Name</th>
                  <th className={DT_TH}>Returns (1Y)</th>
                  <th className={DT_TH}>AUM</th>
                </tr>
              </thead>
              <tbody>
                {topFunds.map((fund) => (
                  <tr key={fund.name} className="group">
                    <td className={TD_1}>
                      <p className="text-sm font-bold text-brand-900 transition-colors group-hover:text-brand-600 dark:text-white">{fund.name}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-tighter text-gray-400">{fund.risk} Risk</p>
                    </td>
                    <td className={`${TD} text-sm font-black text-green-500`}>{fund.returns}</td>
                    <td className={`${TD_END} text-sm font-bold text-gray-600 dark:text-gray-400`}>{fund.aum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MutualFunds;
