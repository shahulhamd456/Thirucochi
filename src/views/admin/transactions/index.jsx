import React from "react";
import { useLocation } from "react-router-dom";
import Card from "components/card";
import { MdReceipt, MdFileUpload, MdFilterList, MdArrowDownward, MdArrowUpward, MdEdit, MdDelete } from "react-icons/md";
import Widget from "components/widget/Widget";
import CrudModal from "components/crud/CrudModal";
import ConfirmDialog from "components/confirm/ConfirmDialog";
import { exportRowsToCsv, filterRowsByQuery } from "utils/tableUtils";
import { DT_WRAP, DT_TABLE, DT_TH, TD, TD_1, TD_END_R } from "utils/dataTableStyles";

const Transactions = () => {
  const [transactions, setTransactions] = React.useState([
    { id: "TXN-8821", date: "2026-04-05", category: "Mutual Fund", amount: "Rs 50,000", type: "Credit", status: "Success" },
    { id: "TXN-8820", date: "2026-04-05", category: "Insurance", amount: "Rs 12,400", type: "Debit", status: "Success" },
    { id: "TXN-8819", date: "2026-04-04", category: "FD Interest", amount: "Rs 8,500", type: "Credit", status: "Pending" },
    { id: "TXN-8818", date: "2026-04-03", category: "Mutual Fund", amount: "Rs 1,00,000", type: "Credit", status: "Success" },
  ]);
  const [search, setSearch] = React.useState("");
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(null);
  const [form, setForm] = React.useState({ id: "", date: "", category: "", amount: "", type: "Credit", status: "Success" });
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const filterRef = React.useRef(null);

  const searchedRows = filterRowsByQuery(transactions, search, ["id", "date", "category", "amount", "type", "status"]);
  const visibleRows = React.useMemo(() => {
    return searchedRows.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (typeFilter !== "all" && row.type !== typeFilter) return false;
      return true;
    });
  }, [searchedRows, statusFilter, typeFilter]);

  React.useEffect(() => {
    setSearch(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);

  React.useEffect(() => {
    if (!filterOpen) return;
    const onDown = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [filterOpen]);

  const filtersActive = statusFilter !== "all" || typeFilter !== "all";
  const clearFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
  };

  const openAdd = () => {
    setEditIndex(null);
    setForm({ id: `TXN-${Date.now().toString().slice(-4)}`, date: "", category: "", amount: "", type: "Credit", status: "Success" });
    setOpen(true);
  };
  const openEdit = (index) => {
    setEditIndex(index);
    setForm(transactions[index]);
    setOpen(true);
  };
  const onSave = () => {
    if (editIndex === null) setTransactions((prev) => [form, ...prev]);
    else setTransactions((prev) => prev.map((row, i) => (i === editIndex ? form : row)));
    setOpen(false);
  };
  const performDelete = () => {
    if (deleteIndex === null) return;
    setTransactions((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="pt-2">
      <div className="mb-8 flex items-center justify-end">
        <div className="flex flex-wrap gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions"
            className="h-10 rounded-lg border border-gray-200 px-3 text-xs outline-none dark:border-white/10 dark:bg-navy-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() =>
              exportRowsToCsv(
                visibleRows,
                [
                  { key: "id", label: "Transaction ID" },
                  { key: "date", label: "Date" },
                  { key: "category", label: "Category" },
                  { key: "amount", label: "Amount" },
                  { key: "type", label: "Type" },
                  { key: "status", label: "Status" },
                ],
                "transactions.csv"
              )
            }
            className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 text-xs font-black uppercase text-brand-900 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
          >
            <MdFileUpload /> Export Statements
          </button>
          <button
            type="button"
            onClick={openAdd}
            className="rounded-2xl bg-[#003366] px-6 py-3 text-sm font-black uppercase text-white shadow-xl shadow-brand-900/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            New Entry
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Widget icon={<MdArrowUpward className="text-green-500" />} title="Monthly Credits" subtitle="Rs 14.5 L" detail="From Investments" trend="+12%" />
        <Widget icon={<MdArrowDownward className="text-red-500" />} title="Monthly Debits" subtitle="Rs 2.8 L" detail="Premiums & Fees" trend="+2%" />
        <Widget icon={<MdReceipt />} title="Pending TXN" subtitle="4" detail="Awaiting Bank Approval" trend="View" />
        <Widget icon={<MdReceipt />} title="Total Volume" subtitle="842" detail="Last 30 Days" trend="+54" />
      </div>

      <Card extra="h-full rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
        <div className="relative mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between" ref={filterRef}>
          <h3 className="text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">Recent Activity Log</h3>
          <button
            type="button"
            onClick={() => setFilterOpen((o) => !o)}
            className={`self-end rounded-xl p-2 transition-all dark:bg-navy-900 sm:self-auto ${
              filtersActive
                ? "bg-brand-100 text-[#003366] dark:bg-brand-900/50 dark:text-brand-300"
                : "bg-gray-50 text-gray-400 hover:text-brand-500 dark:hover:text-brand-400"
            }`}
            aria-expanded={filterOpen}
            aria-label="Open filters"
          >
            <MdFilterList className="text-xl" />
          </button>
          {filterOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,17rem)] rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-navy-800"
              role="dialog"
              aria-label="Filter transactions"
            >
              <p className="mb-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Status</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["all", "Success", "Pending"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wide transition-colors ${
                      statusFilter === s
                        ? "bg-[#003366] text-white dark:bg-brand-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15"
                    }`}
                  >
                    {s === "all" ? "All" : s}
                  </button>
                ))}
              </div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Type</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["all", "Credit", "Debit"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTypeFilter(t)}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wide transition-colors ${
                      typeFilter === t
                        ? "bg-[#003366] text-white dark:bg-brand-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15"
                    }`}
                  >
                    {t === "all" ? "All" : t}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3 dark:border-white/10">
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!filtersActive}
                  className="text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:text-[#003366] disabled:opacity-40 dark:hover:text-brand-300"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="rounded-lg bg-gray-100 px-3 py-1.5 text-[10px] font-black uppercase text-brand-900 dark:bg-white/10 dark:text-white"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={DT_WRAP}>
          <table className={DT_TABLE}>
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/10">
                <th className={DT_TH}>Transaction ID</th>
                <th className={DT_TH}>Date</th>
                <th className={DT_TH}>Category</th>
                <th className={DT_TH}>Amount</th>
                <th className={DT_TH}>Status</th>
                <th className={`${DT_TH} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm font-bold text-gray-400">
                    No transactions match your search or filters.
                  </td>
                </tr>
              ) : (
                visibleRows.map((t) => (
                  <tr key={t.id} className="group">
                    <td className={TD_1}>
                      <span className="inline-block rounded-lg bg-brand-50 px-2.5 py-1.5 font-mono text-xs font-bold text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                        {t.id}
                      </span>
                    </td>
                    <td className={`${TD} tabular-nums text-sm font-bold text-gray-600 dark:text-gray-300`}>{t.date}</td>
                    <td className={TD}>
                      <p className="text-sm font-black uppercase tracking-tighter text-brand-900 dark:text-white">{t.category}</p>
                    </td>
                    <td className={TD}>
                      <span className={`text-sm font-black ${t.type === "Credit" ? "text-green-500" : "text-red-500"}`}>
                        {t.type === "Credit" ? "+" : "-"}
                        {t.amount}
                      </span>
                    </td>
                    <td className={TD}>
                      <span
                        className={`inline-block rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase ${
                          t.status === "Success" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-orange-100 text-orange-600 dark:bg-orange-900/25 dark:text-orange-300"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className={TD_END_R}>
                      <div className="inline-flex items-center justify-end gap-1 pt-0.5">
                        <button
                          type="button"
                          onClick={() => openEdit(transactions.indexOf(t))}
                          className="rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-200/70 hover:text-[#003366] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                          aria-label="Edit transaction"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteIndex(transactions.indexOf(t))}
                          className="rounded-md p-1.5 text-red-600 transition-colors hover:bg-red-100/90 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-300"
                          aria-label="Delete transaction"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-8 border-t border-gray-50 pt-6 text-center dark:border-white/5">
          <button type="button" className="text-xs font-black uppercase tracking-widest text-brand-500 hover:underline">
            View All Ledger Entries
          </button>
        </div>
      </Card>

      <ConfirmDialog
        open={deleteIndex !== null}
        title="Delete transaction?"
        message="Are you sure you want to remove this entry from the activity log?"
        confirmText="Yes, delete"
        cancelText="No"
        onConfirm={performDelete}
        onCancel={() => setDeleteIndex(null)}
      />

      <CrudModal
        open={open}
        title={editIndex === null ? "Add Transaction" : "Edit Transaction"}
        fields={[
          { key: "id", label: "Transaction ID" },
          { key: "date", label: "Date" },
          { key: "category", label: "Category" },
          { key: "amount", label: "Amount" },
          { key: "type", label: "Type" },
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

export default Transactions;
