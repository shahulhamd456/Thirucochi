import React from "react";
import Card from "components/card";
import { DT_WRAP, DT_TABLE, DT_TH, TD, TD_1, TD_END } from "utils/dataTableStyles";
import { MdShield, MdSecurity, MdHistory, MdAddModerator } from "react-icons/md";
import Widget from "components/widget/Widget";

const LifeInsurance = () => {
  const policies = [
    { type: "Term Life", coverage: "Rs 1.5 Cr", premium: "Rs 12,400/yr", status: "Active" },
    { type: "Endowment", coverage: "Rs 50 L", premium: "Rs 45,000/yr", status: "Due" },
    { type: "ULIP", coverage: "Rs 25 L", premium: "Rs 80,000/yr", status: "Active" },
    { type: "Whole Life", coverage: "Rs 1.0 Cr", premium: "Rs 28,000/yr", status: "Active" },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <button className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all">
          GET A QUOTE
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdShield />} title="Total Coverage" subtitle="Rs 3.25 Cr" detail="Across 4 Policies" trend="+50L" />
        <Widget icon={<MdSecurity />} title="Active Status" subtitle="88%" detail="Premium Paid on Time" trend="+5%" />
        <Widget icon={<MdHistory />} title="Claims Pending" subtitle="1" detail="Est. Rs 2.4 L Value" trend="0" />
        <Widget icon={<MdAddModerator />} title="Bonus Accrued" subtitle="Rs 4.8 L" detail="Loyalty Additions" trend="+12%" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Knowledge Base Card */}
        <div className="xl:col-span-5">
          <Card extra="relative flex h-full flex-col justify-center overflow-hidden rounded-xl border border-cyan-500/25 !bg-[#003366] p-8 text-white shadow-lg dark:!border-cyan-400/20 dark:!bg-[#061f3d]">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 uppercase leading-tight">What is Life Insurance?</h3>
              <p className="text-sm text-brand-100/80 leading-relaxed mb-6">
                A contract offering financial security to beneficiaries upon the policyholder's death, which ensures that their future needs are met. Life Insurance helps secure the future income for the family even in the absence of their bread winner.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/5">
                  <div className="h-2 w-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
                  <p className="text-xs font-bold uppercase tracking-widest">Financial Protection</p>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/5">
                  <div className="h-2 w-2 rounded-full bg-brand-400 shadow-lg shadow-brand-400/50" />
                  <p className="text-xs font-bold uppercase tracking-widest">Tax Saving Benefits</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Existing Policies Table */}
        <div className="xl:col-span-7">
          <Card extra="h-full rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <h3 className="mb-6 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white sm:mb-8">Active Policies</h3>
            <div className={DT_WRAP}>
              <table className={DT_TABLE}>
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/10">
                    <th className={DT_TH}>Policy Type</th>
                    <th className={DT_TH}>Sum Assured</th>
                    <th className={DT_TH}>Term Premium</th>
                    <th className={DT_TH}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((p) => (
                    <tr key={p.type} className="group">
                      <td className={TD_1}>
                        <span className="text-sm font-black uppercase tracking-tighter text-brand-900 transition-colors group-hover:text-brand-600 dark:text-white">
                          {p.type}
                        </span>
                      </td>
                      <td className={`${TD} text-sm font-black tracking-tight text-brand-700 dark:text-brand-400`}>{p.coverage}</td>
                      <td className={`${TD} text-sm font-bold text-gray-600 dark:text-gray-400`}>{p.premium}</td>
                      <td className={TD_END}>
                        <span
                          className={`inline-block rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase ${
                            p.status === "Active"
                              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-orange-100 text-orange-600 dark:bg-orange-900/25 dark:text-orange-300"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LifeInsurance;
