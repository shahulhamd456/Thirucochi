import React from "react";
import Card from "components/card";
import { DT_WRAP, DT_TABLE, DT_TH, TD, TD_1, TD_END } from "utils/dataTableStyles";
import { MdOutlineAssignment, MdHowToReg, MdHistory, MdCalculate } from "react-icons/md";
import Widget from "components/widget/Widget";

const ReturnsService = () => {
  const filings = [
    { type: "ITR-1 (Salaried)", client: "Amit Sharma", status: "Filed", date: "2025-07-15", ack: "882190XXXX" },
    { type: "GST R1", client: "TFC Services", status: "Processing", date: "2026-04-10", ack: "Pending" },
    { type: "TDS Revision", client: "Global Tech", status: "Queries", date: "2026-03-22", ack: "22198XXXX" },
    { type: "PAN Correction", client: "Sita Devi", status: "Completed", date: "2026-03-15", ack: "99120XXXX" },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <button className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all uppercase">
          New Tax Filing Request
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdOutlineAssignment />} title="Active Filings" subtitle="18" detail="Under Review" trend="+2" />
        <Widget icon={<MdHowToReg />} title="Compliance Score" subtitle="100%" detail="Timely Submissions" trend="Perfect" />
        <Widget icon={<MdCalculate />} title="TDS Managed" subtitle="Rs 12.4 L" detail="For Corporate Clients" trend="+15%" />
        <Widget icon={<MdHistory />} title="Legacy Files" subtitle="142" detail="Archived Returns" trend="Standard" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <Card extra="h-full rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
             <h3 className="mb-6 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white sm:mb-8">Recent Filing Status</h3>
             <div className={DT_WRAP}>
                <table className={DT_TABLE}>
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-white/10">
                      <th className={DT_TH}>Filing Type</th>
                      <th className={DT_TH}>Client</th>
                      <th className={DT_TH}>Submission</th>
                      <th className={DT_TH}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filings.map((f) => (
                      <tr key={`${f.type}-${f.ack}`} className="group">
                        <td className={TD_1}>
                           <p className="text-sm font-black uppercase tracking-tighter text-brand-900 dark:text-white">{f.type}</p>
                           <p className="mt-1.5 text-[10px] font-bold text-gray-400">ID: {f.ack}</p>
                        </td>
                        <td className={TD}>
                           <span className="inline-block max-w-[10rem] truncate text-sm font-bold text-gray-600 dark:text-gray-300 sm:max-w-[12rem]">{f.client}</span>
                        </td>
                        <td className={`${TD} text-xs font-black tabular-nums text-brand-600 dark:text-brand-400`}>{f.date}</td>
                        <td className={TD_END}>
                           <span className={`inline-block rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase ${
                             f.status === "Filed"
                               ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                               : f.status === "Queries"
                                 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                 : "bg-brand-50 text-brand-500 dark:bg-brand-900/40 dark:text-brand-300"
                           }`}>
                             {f.status}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </Card>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-5">
           <Card extra="relative overflow-hidden rounded-xl border border-cyan-500/20 !bg-[#003366] p-6 text-white shadow-lg dark:!border-cyan-400/20 dark:!bg-[#061f3d]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
              <h4 className="text-lg font-black uppercase mb-4 tracking-tight">Expert Assistance</h4>
              <p className="text-xs text-brand-100/70 font-medium leading-relaxed mb-6">
                Our in-house tax experts are available for specialized GST & IT Return consultations.
              </p>
              <button className="w-full py-3 rounded-xl bg-white/10 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                Schedule Call
              </button>
           </Card>

           <Card extra="p-6 bg-white dark:bg-navy-800 border border-gray-100 dark:border-white/5 rounded-[32px] h-full text-center flex flex-col items-center justify-center">
              <MdCalculate className="text-5xl text-brand-100 mb-4" />
              <h4 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight mb-2">Income Tax Calculator</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Estimate your FY 2025-26 liability</p>
              <button className="px-8 py-2.5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 hover:text-white transition-all">
                 Launch Calc
              </button>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default ReturnsService;
