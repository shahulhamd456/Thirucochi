import React from "react";
import { useLocation } from "react-router-dom";
import Card from "components/card";
import { MdAttachMoney, MdShowChart, MdOutlineAssignment, MdPieChart, MdEdit, MdDelete } from "react-icons/md";
import Widget from "components/widget/Widget";
import CrudModal from "components/crud/CrudModal";
import ConfirmDialog from "components/confirm/ConfirmDialog";
import { filterRowsByQuery } from "utils/tableUtils";
import { DT_WRAP, DT_TABLE, DT_TH, TD, TD_1, TD_END_R } from "utils/dataTableStyles";

const Expenses = () => {
  const [expenseLogs, setExpenseLogs] = React.useState([
    { date: "2026-04-05", category: "Office Rent", entity: "TFC HQ Kochi", amount: "Rs 45,000", status: "Paid" },
    { date: "2026-04-04", category: "Marketing", entity: "Digital Ad Suite", amount: "Rs 1,20,000", status: "Paid" },
    { date: "2026-04-03", category: "Software", entity: "CRM License", amount: "Rs 18,500", status: "Pending" },
    { date: "2026-04-02", category: "Utilities", entity: "Internet & Power", amount: "Rs 8,400", status: "Paid" },
  ]);
  const [search, setSearch] = React.useState("");
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(null);
  const [form, setForm] = React.useState({ date: "", category: "", entity: "", amount: "", status: "Pending" });
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const visibleRows = filterRowsByQuery(expenseLogs, search, ["date", "category", "entity", "amount", "status"]);
  React.useEffect(() => {
    setSearch(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);
  const openAdd = () => {
    setEditIndex(null);
    setForm({ date: "", category: "", entity: "", amount: "", status: "Pending" });
    setOpen(true);
  };
  const openEdit = (index) => {
    setEditIndex(index);
    setForm(expenseLogs[index]);
    setOpen(true);
  };
  const onSave = () => {
    if (editIndex === null) setExpenseLogs((prev) => [form, ...prev]);
    else setExpenseLogs((prev) => prev.map((row, i) => (i === editIndex ? form : row)));
    setOpen(false);
  };
  const performDelete = () => {
    if (deleteIndex === null) return;
    setExpenseLogs((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <div className="flex items-center gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search expenses" className="h-10 rounded-lg border border-gray-200 px-3 text-xs outline-none dark:border-white/10 dark:bg-navy-900 dark:text-white" />
        <button onClick={openAdd} className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-tight">
          Log New Expense
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdAttachMoney />} title="Total YTD Spend" subtitle="Rs 18.4 L" detail="Operational & Sales" trend="+4%" />
        <Widget icon={<MdShowChart />} title="Monthly Burn" subtitle="Rs 2.4 L" detail="Base Overhead" trend="-1.2%" />
        <Widget icon={<MdOutlineAssignment />} title="Unpaid Bills" subtitle="3" detail="Due in 7 Days" trend="Review" />
        <Widget icon={<MdPieChart />} title="Largest Dept" subtitle="Marketing" detail="42% of Spend" trend="Stable" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Expense Distribution Card */}
        <div className="xl:col-span-4">
           <Card extra="p-8 h-full bg-white dark:bg-navy-800 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5">
              <h3 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight mb-8">Asset & Cost Mix</h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fixed Overhead</span>
                       <span className="text-xs font-black text-brand-600 tracking-tighter">65%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 dark:bg-navy-900 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-600 w-[65%]" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Variable Sales Cost</span>
                       <span className="text-xs font-black text-brand-600 tracking-tighter">22%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 dark:bg-navy-900 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-400 w-[22%]" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin & Tech</span>
                       <span className="text-xs font-black text-brand-600 tracking-tighter">13%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 dark:bg-navy-900 rounded-full overflow-hidden">
                       <div className="h-full bg-brand-500 w-[13%]" />
                    </div>
                 </div>
              </div>
              <div className="mt-12 p-5 rounded-2xl bg-brand-50/50 dark:bg-navy-900 border border-brand-100/50 dark:border-white/5">
                 <p className="text-[10px] font-bold text-brand-900 dark:text-white uppercase tracking-[2px] mb-2">Cost-Saving Tip</p>
                 <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Consolidating SaaS licenses could reduce tech overhead by 8.5% next quarter.</p>
              </div>
           </Card>
        </div>

        {/* Detailed Logs Card */}
        <div className="xl:col-span-8">
           <Card extra="h-full rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
              <h3 className="mb-6 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white sm:mb-8">Recent Outflow Log</h3>
              <div className={DT_WRAP}>
                <table className={DT_TABLE}>
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-white/10">
                      <th className={DT_TH}>Category / Desc</th>
                      <th className={DT_TH}>Entity</th>
                      <th className={DT_TH}>Amount</th>
                      <th className={DT_TH}>Status</th>
                      <th className={`${DT_TH} text-right`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((e) => (
                      <tr key={`${e.category}-${e.date}-${e.entity}`} className="group">
                        <td className={TD_1}>
                          <p className="text-sm font-black uppercase tracking-tighter text-brand-900 dark:text-white">{e.category}</p>
                          <p className="mt-1.5 text-[10px] font-bold leading-snug text-gray-400">{e.date}</p>
                        </td>
                        <td className={TD}>
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{e.entity}</span>
                        </td>
                        <td className={`${TD} text-sm font-black text-brand-700 dark:text-brand-400`}>{e.amount}</td>
                        <td className={TD}>
                          <span
                            className={`inline-block rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase ${
                              e.status === "Paid"
                                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-orange-100 text-orange-600 dark:bg-orange-900/25 dark:text-orange-300"
                            }`}
                          >
                            {e.status}
                          </span>
                        </td>
                        <td className={TD_END_R}>
                          <div className="inline-flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => openEdit(expenseLogs.indexOf(e))}
                              className="rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-200/70 hover:text-[#003366] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                              aria-label="Edit expense"
                            >
                              <MdEdit className="text-lg" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteIndex(expenseLogs.indexOf(e))}
                              className="rounded-md p-1.5 text-red-600 transition-colors hover:bg-red-100/90 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-300"
                              aria-label="Delete expense"
                            >
                              <MdDelete className="text-lg" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </Card>
        </div>
      </div>

      <ConfirmDialog
        open={deleteIndex !== null}
        title="Delete expense?"
        message="Are you sure you want to remove this expense row?"
        confirmText="Yes, delete"
        cancelText="No"
        onConfirm={performDelete}
        onCancel={() => setDeleteIndex(null)}
      />

      <CrudModal
        open={open}
        title={editIndex === null ? "Add Expense" : "Edit Expense"}
        fields={[
          { key: "date", label: "Date" },
          { key: "category", label: "Category" },
          { key: "entity", label: "Entity" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
        ]}
        values={form}
        onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
        onClose={() => setOpen(false)}
        onSubmit={onSave}
      />
    </div>
  );
};

export default Expenses;
