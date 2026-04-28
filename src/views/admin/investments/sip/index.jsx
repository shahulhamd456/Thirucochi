import React from "react";
import Card from "components/card";
import { MdOutlineAutoGraph, MdOutlineRestore, MdOutlineTrackChanges, MdOutlineCalculate } from "react-icons/md";
import Widget from "components/widget/Widget";

const SIP = () => {
  const sipGoals = [
    { goal: "Retirement 2045", corpus: "Rs 2.5 Cr", sip: "Rs 45,000", progress: "42%" },
    { goal: "Child Education", corpus: "Rs 80 L", sip: "Rs 15,000", progress: "65%" },
    { goal: "Vacation Home", corpus: "Rs 1.2 Cr", sip: "Rs 25,000", progress: "18%" },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <button className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all uppercase">
          Setup New SIP
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdOutlineAutoGraph />} title="Active SIPs" subtitle="Rs 38.5 L" detail="Month-on-Month" trend="+8.2%" />
        <Widget icon={<MdOutlineRestore />} title="Total Invested" subtitle="Rs 1.8 Cr" detail="Principal Amount" trend="+4%" />
        <Widget icon={<MdOutlineTrackChanges />} title="Market Value" subtitle="Rs 2.4 Cr" detail="Current Portfolio" trend="+32%" />
        <Widget icon={<MdOutlineCalculate />} title="Average Yield" subtitle="14.5%" detail="XIRR Performance" trend="+1.5%" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Goal Tracking Card */}
        <div className="xl:col-span-8">
          <Card extra="p-8 bg-white dark:bg-navy-800 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5 h-full">
            <h3 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight mb-8">Financial Goal Tracking</h3>
            <div className="space-y-8">
               {sipGoals.map((g, i) => (
                 <div key={i} className="group">
                    <div className="flex justify-between items-center mb-4">
                       <div>
                          <p className="text-sm font-black text-brand-900 dark:text-white uppercase tracking-tighter">{g.goal}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target: {g.corpus}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-black text-brand-600 truncate">{g.sip}/mo</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{g.progress} Completed</p>
                       </div>
                    </div>
                    <div className="h-2.5 w-full bg-gray-50 dark:bg-navy-900 rounded-full overflow-hidden relative">
                       <div className="h-full bg-brand-600 rounded-full transition-all duration-1000 group-hover:scale-x-105 origin-left" style={{ width: g.progress }} />
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-12 p-6 rounded-2xl bg-brand-50/50 dark:bg-navy-900 border border-brand-100/50">
               <p className="text-[11px] font-bold text-brand-900 dark:text-white uppercase tracking-[2px] mb-2 leading-none">Smart Advice</p>
               <p className="text-xs text-gray-500 font-medium leading-relaxed">Increasing your SIP by just 10% annually could reduce your retirement goal timeline by 4.5 years.</p>
            </div>
          </Card>
        </div>

        {/* Why SIP? Card */}
        <div className="xl:col-span-4 flex flex-col gap-5">
           <Card extra="relative overflow-hidden rounded-xl border border-cyan-500/20 !bg-[#003366] p-6 text-white shadow-lg dark:!border-cyan-400/20 dark:!bg-[#061f3d]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
              <h4 className="text-lg font-black uppercase mb-4 tracking-tight">The Power of Choice</h4>
              <p className="text-xs text-brand-100/70 font-medium leading-relaxed mb-6 italic">
                "Step into the world of Thirukochi Financial Services. We recognize that your financial journey is more than just transactions; it's the path to realizing your life's dreams."
              </p>
              <div className="h-1 w-20 bg-brand-400 rounded-full" />
           </Card>

           <Card extra="p-6 bg-white dark:bg-navy-800 border border-gray-100 dark:border-white/5 rounded-[32px] h-full">
              <h4 className="text-lg font-black text-brand-900 dark:text-white uppercase mb-4 tracking-tight">Upcoming SIP Dates</h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-navy-900">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Apr 10</span>
                    <span className="text-xs font-black text-brand-900 dark:text-white uppercase tracking-tighter">HDFC Top 100</span>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-navy-900">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Apr 15</span>
                    <span className="text-xs font-black text-brand-900 dark:text-white uppercase tracking-tighter">SBI Bluechip</span>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default SIP;
