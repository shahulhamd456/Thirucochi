import React from "react";
import PieChart from "components/charts/PieChart";
import {
  pieChartData,
  pieChartOptions,
  pieChartSeriesByPeriod,
} from "variables/charts";
import Card from "components/card";
import { MdExpandMore } from "react-icons/md";

const PERIODS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "weekly", label: "Weekly" },
];

const PieChartCard = () => {
  const [period, setPeriod] = React.useState("monthly");
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);

  const series = pieChartSeriesByPeriod[period] ?? pieChartData;

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentLabel =
    PERIODS.find((p) => p.value === period)?.label ?? "Monthly";

  return (
    <Card extra="relative z-10 rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Your Pie Chart
          </h4>
        </div>

        <div ref={rootRef} className="relative mb-6 flex items-center">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-brand-500 outline-none transition hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-brand-500/40 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:hover:bg-white/5"
          >
            {currentLabel}
            <MdExpandMore
              className={`h-4 w-4 shrink-0 text-brand-400 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          {open ? (
            <ul
              role="listbox"
              aria-label="Chart period"
              className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-navy-800"
            >
              {PERIODS.map((p) => (
                <li key={p.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={period === p.value}
                    className={`flex w-full items-center px-4 py-2.5 text-left text-sm font-bold transition ${
                      period === p.value
                        ? "bg-brand-500 text-white"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setPeriod(p.value);
                      setOpen(false);
                    }}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart
          key={period}
          options={pieChartOptions}
          series={series}
        />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Your Files</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {series[0]}%
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">System</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {series[1]}%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;
