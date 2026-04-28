import React from "react";
import Card from "components/card";
import { MdTrendingUp, MdBarChart, MdTrackChanges, MdSportsScore } from "react-icons/md";
import Widget from "components/widget/Widget";

const PerformanceTargets = () => {
  const targets = [
    { label: "Quarterly AUM Growth", target: "Rs 5 Cr", current: "Rs 3.8 Cr", progress: "76%" },
    { label: "New SIP Acquisition", target: "150 Nos", current: "112 Nos", progress: "74%" },
    { label: "Insurance Policy Count", target: "80 Nos", current: "92 Nos", progress: "100%" },
    { label: "Lead Conversion", target: "25%", current: "22.4%", progress: "89%" },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <button className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all uppercase">
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdSportsScore />} title="Overall Score" subtitle="92/100" detail="Exceeding Peers" trend="+5" />
        <Widget icon={<MdTrackChanges />} title="Target Status" subtitle="84%" detail="Total Progress" trend="+2.4%" />
        <Widget icon={<MdBarChart />} title="Revenue Index" subtitle="1.24" detail="Internal Benchmark" trend="+0.12" />
        <Widget icon={<MdTrendingUp />} title="Projected AUM" subtitle="Rs 28 Cr" detail="By Exit FY26" trend="+12%" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <Card extra="p-8 bg-white dark:bg-navy-800 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5 h-full">
            <h3 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight mb-8">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               {targets.map((t, i) => (
                 <div key={i} className="group">
                    <div className="flex justify-between items-center mb-3">
                       <div>
                          <p className="text-sm font-black text-brand-900 dark:text-white uppercase tracking-tighter">{t.label}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">Goal: {t.target}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-black text-brand-600 tracking-tight">{t.current}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.progress} Reached</p>
                       </div>
                    </div>
                    <div className="h-2 w-full bg-gray-50 dark:bg-navy-900 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-600 rounded-full transition-all duration-1000 group-hover:bg-brand-500" style={{ width: t.progress }} />
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="mt-12 p-6 rounded-2xl bg-brand-50/50 dark:bg-navy-900 border border-brand-100/50 text-center">
               <p className="text-[10px] font-black text-brand-900 dark:text-white uppercase tracking-[4px] mb-2 leading-none">Branch Performance Index</p>
               <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                 "Our Commitment to professional excellence at Thirukochi ensures every branch maintains a 95%+ client satisfaction ratio."
               </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTargets;
