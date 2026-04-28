import React from "react";
import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import Progress from "components/progress";
import { MdCheckCircle, MdPendingActions, MdOutlineHourglassEmpty } from "react-icons/md";

const ExecutiveTaskCard = ({ metrics, branch }) => {
  // If metrics are not provided, show defaults
  const { total = 0, completed = 0, pending = 0, inProgress = 0 } = metrics || {};
  
  const completedPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPct = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const pendingPct = total > 0 ? Math.round((pending / total) * 100) : 0;

  return (
    <Card extra="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold text-[#003366] dark:text-white">Task Overview</h4>
          <p className="text-sm text-gray-400">
            {branch === "All Branches" ? "Across all branches" : `${branch} branch`}
          </p>
        </div>
        <CardMenu />
      </div>

      <div className="flex flex-col justify-center h-full gap-5">
        {/* Total Metric */}
        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-navy-900/50 rounded-xl py-4 border border-gray-100 dark:border-white/10">
          <span className="text-3xl font-bold text-brand-500 dark:text-white">{total.toLocaleString()}</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Total Tasks Today</span>
        </div>

        {/* Status Breakdown */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-bold text-green-600 dark:text-green-400">
                <MdCheckCircle className="text-lg"/> Completed
              </span>
              <span className="font-bold text-gray-700 dark:text-white">
                {completed.toLocaleString()} <span className="font-medium text-gray-400 text-xs ml-1">({completedPct}%)</span>
              </span>
            </div>
            <Progress value={completedPct} color="green" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-bold text-yellow-600 dark:text-yellow-400">
                <MdOutlineHourglassEmpty className="text-lg"/> In Progress
              </span>
              <span className="font-bold text-gray-700 dark:text-white">
                {inProgress.toLocaleString()} <span className="font-medium text-gray-400 text-xs ml-1">({inProgressPct}%)</span>
              </span>
            </div>
            <Progress value={inProgressPct} color="yellow" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-bold text-red-500 dark:text-red-400">
                <MdPendingActions className="text-lg"/> Pending
              </span>
              <span className="font-bold text-gray-700 dark:text-white">
                {pending.toLocaleString()} <span className="font-medium text-gray-400 text-xs ml-1">({pendingPct}%)</span>
              </span>
            </div>
            <Progress value={pendingPct} color="red" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExecutiveTaskCard;
