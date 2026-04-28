import React, { useState, useEffect } from "react";
import Dropdown from "components/dropdown";
import ConfirmDialog from "components/confirm/ConfirmDialog";
import CrudModal from "components/crud/CrudModal";
import { FiMoreVertical } from "react-icons/fi";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { useFetchJson } from "hooks/useFetchJson";
import { API } from "api/endpoints";

const StatCard = ({ title, value, sub, trend, trendUp, onEdit, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-navy-800">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{title}</h3>
          <Dropdown
            button={
              <button
                type="button"
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#003366] dark:hover:bg-white/10"
                aria-label="Card actions"
              >
                <FiMoreVertical className="h-4 w-4" />
              </button>
            }
            classNames="right-0 top-8 w-36"
            children={
              <div className="rounded-xl border border-gray-100 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-navy-800">
                <button
                  type="button"
                  onClick={onEdit}
                  className="block w-full px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="block w-full px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete
                </button>
              </div>
            }
          />
        </div>
        <p className="text-2xl font-bold tracking-tight text-[#003366] dark:text-white">{value}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span
            className={`inline-flex items-center gap-0.5 font-bold ${
              trendUp
                ? "text-green-600 dark:text-green-400 [&_svg]:text-green-600 dark:[&_svg]:text-green-400"
                : "text-red-600 dark:text-red-400 [&_svg]:text-red-600 dark:[&_svg]:text-red-400"
            }`}
          >
            {trendUp ? <MdTrendingUp className="h-3.5 w-3.5 shrink-0" /> : <MdTrendingDown className="h-3.5 w-3.5 shrink-0" />}
            {trend}
          </span>
          <span className="text-gray-400 dark:text-gray-500">{sub}</span>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Remove this metric card?"
        message="This is a demo action. Continue?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => {
          onDelete?.();
          setConfirmDelete(false);
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
};

/** Default UI; override any field from GET /api/dashboard/stats (array of 4 objects). */
const DEFAULT_STRIP_STATS = [
  { title: "Total contacts", value: "5,758", trend: "+2.57%", trendUp: true, sub: "vs last month" },
  { title: "Lead analytics", value: "70", trend: "-2.57%", trendUp: false, sub: "vs last month" },
  { title: "Active deals", value: "1,249", trend: "+2.57%", trendUp: true, sub: "vs last month" },
  { title: "Revenue (YTD)", value: "Rs 2.56 Cr", trend: "+20%", trendUp: true, sub: "vs last month" },
];

const DashboardStatStrip = () => {
  const fetchedStats = useFetchJson(API.dashboardStats, DEFAULT_STRIP_STATS);
  const [stats, setStats] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ title: "", value: "", trend: "", sub: "" });

  useEffect(() => {
    if (fetchedStats) {
      setStats(fetchedStats);
    }
  }, [fetchedStats]);

  const handleDelete = (index) => {
    setStats((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(stats[index]);
  };

  const handleSave = () => {
    const newItem = { ...form, trendUp: form.trend ? !form.trend.startsWith("-") : true };
    if (editIndex !== null) {
      setStats((prev) => prev.map((item, i) => (i === editIndex ? newItem : item)));
      setEditIndex(null);
    } else if (isAdding) {
      setStats((prev) => [...prev, newItem]);
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((row, i) => (
          <StatCard
            key={`${row.title}-${i}`}
            title={row.title}
            value={row.value}
            trend={row.trend}
            trendUp={row.trendUp}
            sub={row.sub}
            onEdit={() => handleEdit(i)}
            onDelete={() => handleDelete(i)}
          />
        ))}
        
        {stats.length < 4 && (
          <button
            type="button"
            onClick={() => {
              setForm({ title: "", value: "", trend: "", sub: "" });
              setIsAdding(true);
            }}
            className="flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50/50 text-gray-400 transition-colors hover:border-[#003366] hover:bg-brand-50 hover:text-[#003366] dark:border-white/10 dark:bg-navy-800/50 dark:hover:border-brand-400 dark:hover:bg-white/5 dark:hover:text-brand-400"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-light leading-none">+</span>
              <span className="text-xs font-bold uppercase tracking-wide">Add Metric</span>
            </div>
          </button>
        )}
      </div>

      <CrudModal
        open={editIndex !== null || isAdding}
        title={isAdding ? "Add Metric Card" : "Edit Metric Card"}
        fields={[
          { key: "title", label: "Title", full: true },
          { key: "value", label: "Value" },
          { key: "trend", label: "Trend (e.g. +5% or -2%)" },
          { key: "sub", label: "Subtitle", full: true },
        ]}
        values={form}
        onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
        onClose={() => {
          setEditIndex(null);
          setIsAdding(false);
        }}
        onSubmit={handleSave}
      />
    </>
  );
};

export default DashboardStatStrip;
