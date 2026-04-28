import CardMenu from "components/card/CardMenu";
import React from "react";
import Checkbox from "components/checkbox";
import { MdDragIndicator, MdCheckCircle } from "react-icons/md";
import Card from "components/card";

const INITIAL_TASKS = [
  { id: "1", label: "Reconcile SIP settlements before EOD", done: false },
  { id: "2", label: "Follow up overdue insurance premiums", done: false },
  { id: "3", label: "Review MF KYC / AML exception queue", done: false },
  { id: "4", label: "Publish corporate FD rate sheet to CRM", done: false },
  { id: "5", label: "Validate NACH payout file vs ledger", done: false },
];

const TaskCard = () => {
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);
  const dragIdRef = React.useRef(null);

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDragStart = (e, id) => {
    dragIdRef.current = id;
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", id);
    } catch {
      /* IE / older */
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId =
      dragIdRef.current || e.dataTransfer.getData("text/plain") || "";
    dragIdRef.current = null;
    if (!sourceId || sourceId === targetId) return;
    setTasks((prev) => {
      const next = [...prev];
      const si = next.findIndex((t) => t.id === sourceId);
      const ti = next.findIndex((t) => t.id === targetId);
      if (si < 0 || ti < 0) return prev;
      const [moved] = next.splice(si, 1);
      next.splice(ti, 0, moved);
      return next;
    });
  };

  return (
    <Card extra="relative z-10 min-w-0 max-w-full overflow-visible pb-7 p-4 sm:p-[20px]">
      <div className="flex min-w-0 flex-row flex-wrap items-center justify-between gap-x-2 gap-y-2">
        <div className="flex min-w-0 max-w-[calc(100%-3rem)] flex-1 items-center sm:max-w-none">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-100 dark:bg-white/5">
            <MdCheckCircle className="h-6 w-6 text-brand-500 dark:text-white" />
          </div>
          <h4 className="ml-3 min-w-0 truncate text-lg font-bold text-navy-700 dark:text-white sm:ml-4 sm:text-xl">
            Finance tasks
          </h4>
        </div>
        <div className="shrink-0">
          <CardMenu />
        </div>
      </div>

      <div className="mt-1 min-w-0 w-full">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="mt-2 flex min-w-0 flex-col gap-2 rounded-xl p-2 first:mt-4 hover:bg-gray-50/80 sm:mt-2 sm:flex-row sm:items-start sm:justify-between sm:first:mt-5 dark:hover:bg-white/[0.04]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, t.id)}
          >
            <div className="flex min-w-0 w-full items-start gap-2 sm:flex-1">
              <span className="shrink-0 pt-0.5">
                <Checkbox
                  color="blue"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                  name={`finance-task-${t.id}`}
                  aria-label={t.label}
                />
              </span>
              <p
                className={`min-w-0 flex-1 text-sm font-bold leading-snug text-navy-700 [overflow-wrap:anywhere] sm:text-base dark:text-white ${
                  t.done ? "text-gray-400 line-through dark:text-gray-500" : ""
                }`}
              >
                {t.label}
              </p>
            </div>
            <div className="flex shrink-0 ms-auto sm:ms-0 sm:pt-0.5">
              <button
                type="button"
                draggable
                onDragStart={(e) => {
                  e.stopPropagation();
                  handleDragStart(e, t.id);
                }}
                className="cursor-grab touch-none rounded-md p-1 text-navy-700 active:cursor-grabbing dark:text-white"
                aria-label={`Reorder: ${t.label}`}
              >
                <MdDragIndicator className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TaskCard;
