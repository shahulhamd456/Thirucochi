import React from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";

const TotalSpent = () => {
  return (
    <Card extra="!p-[24px]">
      <div className="flex items-center justify-between">
        <button className="mt-1 flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 dark:border-white/10 dark:bg-navy-700 dark:text-gray-200 dark:hover:bg-white/10">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium">This month</span>
        </button>
        <button className="z-[1] flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 text-[#003366] transition-colors hover:bg-gray-100 dark:border-white/10 dark:bg-navy-700 dark:text-white dark:hover:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4 flex flex-col justify-center">
          <p className="mt-2 text-5xl font-extrabold text-navy-700 dark:text-white">
            $37.5K
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">Total Spent</p>
            <div className="flex flex-row items-center justify-center gap-0.5 text-green-600 dark:text-green-400">
              <MdArrowDropUp className="h-8 w-8 shrink-0 font-medium" />
              <p className="text-2xl font-bold">+2.45%</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 h-[332px] w-full">
          <LineChart
            options={lineChartOptionsTotalSpent}
            series={lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
