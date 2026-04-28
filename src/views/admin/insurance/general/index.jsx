import React from "react";
import Card from "components/card";
import { DT_WRAP, DT_TABLE, DT_TH, TD, TD_1, TD_END } from "utils/dataTableStyles";
import { MdCarRental, MdHomeWork, MdCheckCircle, MdOutlineHealthAndSafety } from "react-icons/md";
import Widget from "components/widget/Widget";

const GeneralInsurance = () => {
  const assets = [
    { type: "Motor Insurance", id: "KL-07-BW-XXXX", valid: "2025-10-12", provider: "HDFC Ergo" },
    { type: "Home Insurance", id: "PROP-9921", valid: "2026-06-01", provider: "ICICI Lombard" },
    { type: "Health Insurance", id: "HLT-4482", valid: "2025-12-24", provider: "Care Health" },
    { type: "Marine Insurance", id: "MAR-1120", valid: "2024-11-20", provider: "Bajaj Allianz" },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <button className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all">
          ADD ASSET
        </button>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdCarRental />} title="Motor Policies" subtitle="12" detail="Renewal in 30 days" trend="+3" />
        <Widget icon={<MdHomeWork />} title="Property Value" subtitle="Rs 12.4 Cr" detail="Coverage: Rs 8 Cr" trend="0" />
        <Widget icon={<MdOutlineHealthAndSafety />} title="Health Claims" subtitle="Rs 34.5 L" detail="Disbursed YTD" trend="+12%" />
        <Widget icon={<MdCheckCircle />} title="Claims Success" subtitle="99.2%" detail="Settlement Ratio" trend="+0.2%" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Assets & Renewals Table */}
        <Card extra="p-8 bg-white dark:bg-navy-800 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full -mr-16 -mt-16" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight">Insured Assets & Renewals</h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Live Tracking</span>
            </div>
          </div>

          <div className={`relative z-10 ${DT_WRAP}`}>
            <table className={DT_TABLE}>
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10">
                  <th className={`${DT_TH} tracking-[2.5px]`}>Asset Category</th>
                  <th className={`${DT_TH} tracking-[2.5px]`}>Asset ID / Reg No.</th>
                  <th className={`${DT_TH} tracking-[2.5px]`}>Policy Expiry</th>
                  <th className={`${DT_TH} tracking-[2.5px]`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id} className="group">
                    <td className={TD_1}>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 transition-colors group-hover:bg-white dark:border-white/5 dark:bg-navy-900 dark:group-hover:bg-navy-800">
                          <MdCheckCircle className="text-lg text-brand-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black uppercase tracking-tighter text-brand-900 dark:text-white">{asset.type}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{asset.provider}</p>
                        </div>
                      </div>
                    </td>
                    <td className={TD}>
                      <span className="inline-block rounded-lg bg-brand-50 px-2.5 py-1.5 font-mono text-xs font-bold text-brand-600 dark:bg-brand-900/50 dark:text-brand-400">
                        {asset.id}
                      </span>
                    </td>
                    <td className={TD}>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{asset.valid}</p>
                      <p className="mt-1 text-[9px] font-black uppercase tracking-tighter text-orange-500">Renew Policy Soon</p>
                    </td>
                    <td className={TD_END}>
                      <button
                        type="button"
                        className="text-[10px] font-black uppercase tracking-wide text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-800 dark:text-brand-400"
                      >
                        VIEW POLICY
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card extra="p-6 bg-gradient-to-br from-brand-900 to-brand-800 text-white rounded-[32px] shadow-xl">
            <h4 className="text-lg font-black uppercase mb-3">Claim Process</h4>
            <p className="text-sm text-brand-100/70 mb-4 font-medium leading-relaxed">
              We are dedicated to managing the investments of your made-in general insurance whether it be Motor Insurance, Fire Insurance, or Property Insurance.
            </p>
            <div className="h-1 w-20 bg-brand-400 rounded-full" />
          </Card>
          <Card extra="p-6 bg-white dark:bg-navy-800 border border-gray-100 dark:border-white/5 rounded-[32px]">
            <h4 className="text-lg font-black text-brand-900 dark:text-white uppercase mb-3">Renewal Alerts</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium leading-relaxed">
              Experience seamless wealth transition with the transmission of financial products. efficiently transfer assets to rightful heirs.
            </p>
            <div className="h-1 w-20 bg-brand-100 dark:bg-navy-700 rounded-full" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GeneralInsurance;
