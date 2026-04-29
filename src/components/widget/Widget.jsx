import Card from "components/card";

const Widget = ({ icon, title, subtitle, detail, trend }) => {
  return (
    <Card extra="p-4 rounded-[24px] bg-white/50 dark:bg-navy-800/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 group hover:shadow-2xl transition-all duration-500">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-navy-900 group-hover:scale-110 transition-transform">
            <span className="text-2xl text-[#003366] dark:text-brand-500">
              {icon}
            </span>
          </div>
          {trend && (
            <div
              className={`flex items-center rounded-lg px-2 py-1 text-xs font-black ${
                trend.startsWith("+")
                  ? "bg-green-50 text-green-700 ring-1 ring-green-200/80 dark:bg-green-950/50 dark:text-green-400 dark:ring-green-700/50"
                  : trend.startsWith("-")
                    ? "bg-red-50 text-red-700 ring-1 ring-red-200/80 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-800/50"
                    : "bg-gray-100 text-gray-600 dark:bg-navy-900 dark:text-gray-400"
              }`}
            >
              {trend}
            </div>
          )}
        </div>

        <div className="flex flex-col mt-1 gap-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{title}</p>
          <h4 className="text-2xl font-black text-[#003366] dark:text-white">
            {subtitle}
          </h4>
          {detail && (
            <p className="text-[11px] font-bold text-[#7367F0] dark:text-brand-400 mt-1 uppercase tracking-widest">
              {detail}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Widget;
