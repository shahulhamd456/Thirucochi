import React from "react";
import Card from "components/card";
import { MdAccountBalance, MdSavings, MdUpdate, MdWarning } from "react-icons/md";
import Widget from "components/widget/Widget";

const FixedDeposits = () => {
  const depositList = [
    { provider: "HDFC Bank", amount: "Rs 25 L", rate: "7.2%", maturity: "2025-08-15", type: "Bank FD", progress: 68 },
    { provider: "Shriram Finance", amount: "Rs 15 L", rate: "8.5%", maturity: "2026-02-10", type: "Corporate FD", progress: 42 },
    { provider: "ICICI Bank", amount: "Rs 20 L", rate: "7.0%", maturity: "2025-05-20", type: "Bank FD", progress: 55 },
    { provider: "Bajaj Finserv", amount: "Rs 10 L", rate: "8.2%", maturity: "2024-12-05", type: "Corporate FD", progress: 90 },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <button className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all">
          BOOK NEW FD
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdAccountBalance />} title="Total FD Amount" subtitle="Rs 70.0 L" detail="Bank & Corporate" trend="+5.5%" />
        <Widget icon={<MdUpdate />} title="Maturity Value" subtitle="Rs 76.2 L" detail="Est. Yield" trend="+Rs 6.2L" />
        <Widget icon={<MdSavings />} title="Avg. Interest" subtitle="7.72%" detail="Weighted Rate" trend="+0.1%" />
        <Widget icon={<MdWarning />} title="Expiring Soon" subtitle="Rs 30 L" detail="Next 60 Days" trend="Action Required" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Deposit List Table */}
        <div className="xl:col-span-8">
          <Card extra="h-full rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <h3 className="mb-6 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white sm:mb-8">
              Active Fixed Deposits
            </h3>
            <div className="-mx-1 overflow-x-auto px-1">
              <table className="w-full border-separate border-spacing-x-0 border-spacing-y-1.5 text-left">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/10">
                    <th className="w-[32%] px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
                      Institution
                    </th>
                    <th className="px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
                      Principal
                    </th>
                    <th className="px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
                      Rate %
                    </th>
                    <th className="px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
                      Maturity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {depositList.map((d) => {
                    const progressPct = d.progress;
                    return (
                      <tr key={`${d.provider}-${d.maturity}`} className="group">
                        <td className="px-4 py-4 align-top transition-all duration-300 ease-out group-hover:bg-gray-50/90 group-hover:first:rounded-l-2xl dark:group-hover:bg-white/[0.06]">
                          <p className="text-sm font-black uppercase tracking-tighter text-brand-900 dark:text-white">
                            {d.provider}
                          </p>
                          <p className="mt-1.5 text-[10px] font-bold uppercase leading-snug tracking-widest text-gray-400">
                            {d.type}
                          </p>
                        </td>
                        <td className="px-4 py-4 align-middle tabular-nums transition-all duration-300 ease-out group-hover:bg-gray-50/90 dark:group-hover:bg-white/[0.06]">
                          <span className="text-sm font-black tracking-tight text-brand-600 dark:text-brand-400">
                            {d.amount}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-middle tabular-nums text-sm font-bold text-gray-700 transition-all duration-300 ease-out group-hover:bg-gray-50/90 dark:text-gray-300 dark:group-hover:bg-white/[0.06]">
                          {d.rate}
                        </td>
                        <td className="px-4 py-4 align-top transition-all duration-300 ease-out group-hover:bg-gray-50/90 group-hover:last:rounded-r-2xl dark:group-hover:bg-white/[0.06]">
                          <p className="text-sm font-bold tabular-nums text-gray-700 dark:text-gray-300">{d.maturity}</p>
                          <div className="mt-3 h-1.5 max-w-[7.5rem] overflow-hidden rounded-full bg-gray-100 dark:bg-navy-900">
                            <div
                              className="h-full rounded-full bg-brand-500 dark:bg-brand-400"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Bond Market Insights */}
        <div className="xl:col-span-4 flex flex-col gap-5">
           <Card extra="rounded-[28px] border border-cyan-500/20 !bg-[#003366] p-6 text-white shadow-lg dark:!border-cyan-400/20 dark:!bg-[#061f3d]">
              <h4 className="mb-4 text-lg font-black uppercase tracking-tight">Corporate Deposits</h4>
              <p className="mb-6 text-xs font-medium leading-relaxed text-brand-100/70">
                Explore the reliability of Company Deposits for stable returns. These fixed-term deposits provide a high-yield alternative to traditional bank FDs.
              </p>
              <div className="rounded-2xl border border-white/5 bg-white/10 p-4">
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand-200 mb-1">Top Opportunity</p>
                 <p className="text-sm font-bold">Bajaj Finserv - 8.60%*</p>
              </div>
           </Card>

           <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-navy-800">
              <h4 className="mb-4 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">RBI Bonds</h4>
              <p className="text-xs font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                Discover the security of RBI Bonds for stable and risk-free returns. Issued by the Reserve Bank of India, these provide a reliable investment avenue.
              </p>
              <button
                type="button"
                className="mt-6 w-full rounded-2xl border-2 border-dashed border-gray-100 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all hover:border-brand-500 hover:text-brand-500 dark:border-white/10"
              >
                Learn More
              </button>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default FixedDeposits;
