import React from "react";
import { useLocation } from "react-router-dom";
import Card from "components/card";
import { MdGroup, MdPersonAdd, MdFilterList, MdEdit, MdDelete } from "react-icons/md";
import Widget from "components/widget/Widget";
import CrudModal from "components/crud/CrudModal";
import ConfirmDialog from "components/confirm/ConfirmDialog";
import { filterRowsByQuery } from "utils/tableUtils";

const Customers = () => {
  const [customerList, setCustomerList] = React.useState([
    { name: "John Doe", category: "HNI", city: "Kochi", assets: "Rs 4.5 Cr", status: "Active" },
    { name: "Sarah Smith", category: "Retail", city: "Ernakulam", assets: "Rs 24 L", status: "Active" },
    { name: "Robert Wilson", category: "Corporate", city: "Thrissur", assets: "Rs 12.8 Cr", status: "Active" },
    { name: "Maria Garcia", category: "HNI", city: "Kochi", assets: "Rs 8.2 Cr", status: "Inactive" },
  ]);
  const [search, setSearch] = React.useState("");
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(null);
  const [form, setForm] = React.useState({ name: "", category: "", city: "", assets: "", status: "Active" });
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [segmentFilter, setSegmentFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const filterRef = React.useRef(null);

  const searchedRows = filterRowsByQuery(customerList, search, ["name", "category", "city", "assets", "status"]);
  const visibleRows = React.useMemo(() => {
    return searchedRows.filter((row) => {
      if (segmentFilter !== "all" && row.category !== segmentFilter) return false;
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      return true;
    });
  }, [searchedRows, segmentFilter, statusFilter]);

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

  const filtersActive = segmentFilter !== "all" || statusFilter !== "all";
  const clearFilters = () => {
    setSegmentFilter("all");
    setStatusFilter("all");
  };

  const openAdd = () => {
    setEditIndex(null);
    setForm({ name: "", category: "", city: "", assets: "", status: "Active" });
    setOpen(true);
  };

  const openEdit = (index) => {
    setEditIndex(index);
    setForm(customerList[index]);
    setOpen(true);
  };

  const onSave = () => {
    if (editIndex === null) {
      setCustomerList((prev) => [...prev, form]);
    } else {
      setCustomerList((prev) => prev.map((row, i) => (i === editIndex ? form : row)));
    }
    setOpen(false);
  };

  const performDelete = () => {
    if (deleteIndex === null) return;
    setCustomerList((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="pt-2">
      <div className="mb-8 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 rounded-2xl bg-[#003366] px-6 py-3 text-sm font-black text-white shadow-xl shadow-brand-900/20 transition-all hover:scale-[1.02] active:scale-95"
        >
          <MdPersonAdd className="text-lg" /> ADD CUSTOMER
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdGroup />} title="Total Customers" subtitle="3,420" detail="Active: 3,100" trend="+42" />
        <Widget icon={<MdGroup />} title="HNI Clients" subtitle="182" detail="Assets > Rs 5 Cr" trend="+5" />
        <Widget icon={<MdGroup />} title="Corporate Accounts" subtitle="45" detail="Active Entities" trend="0" />
        <Widget icon={<MdGroup />} title="Direct Prospects" subtitle="240" detail="Conversion: 12%" trend="+14" />
      </div>

      <Card extra="bg-white p-6 dark:bg-navy-800 sm:p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">
            Client Directory
          </h3>
          <div className="relative flex min-w-0 w-full shrink-0 items-center justify-end gap-3 sm:w-auto sm:max-w-none" ref={filterRef}>
            <button
              type="button"
              onClick={() => setFilterOpen((o) => !o)}
              className={`shrink-0 rounded-xl p-2 transition-all dark:bg-navy-900 ${
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
                aria-label="Filter clients"
              >
                <p className="mb-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Segment</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {["all", "HNI", "Retail", "Corporate"].map((seg) => (
                    <button
                      key={seg}
                      type="button"
                      onClick={() => setSegmentFilter(seg)}
                      className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wide transition-colors ${
                        segmentFilter === seg
                          ? "bg-[#003366] text-white dark:bg-brand-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15"
                      }`}
                    >
                      {seg === "all" ? "All" : seg}
                    </button>
                  ))}
                </div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-wider text-gray-400">Status</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {["all", "Active", "Inactive"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wide transition-colors ${
                        statusFilter === st
                          ? "bg-[#003366] text-white dark:bg-brand-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15"
                      }`}
                    >
                      {st === "all" ? "All" : st}
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
            <div className="flex h-11 min-w-0 flex-1 items-center rounded-full border border-gray-200/90 bg-gray-100 dark:border-white/10 dark:bg-[#0c1228] sm:min-w-[16rem] sm:flex-initial sm:max-w-md">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                inputMode="search"
                name="client-directory-search"
                autoComplete="off"
                placeholder="Search by name or city..."
                aria-label="Search by name or city"
                className="directory-search-input min-h-0 w-full min-w-0 flex-1 rounded-full border-0 px-4 py-2.5 text-xs font-bold leading-normal text-brand-900 outline-none ring-0 placeholder:text-gray-500 focus:ring-0 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="-mx-1 overflow-x-auto px-1">
          <table className="w-full border-separate border-spacing-x-0 border-spacing-y-1.5 text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/10">
                <th className="px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">Customer Name</th>
                <th className="px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">Segment</th>
                <th className="px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">Location</th>
                <th className="px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">Total AUM</th>
                <th className="px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400">Last Contact</th>
                <th className="px-4 pb-4 pt-0 text-right text-[10px] font-black uppercase tracking-[2px] text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm font-bold text-gray-400">
                    No clients match your search or filters.
                  </td>
                </tr>
              ) : (
                visibleRows.map((c) => (
                <tr key={`${c.name}-${c.city}`} className="group">
                  <td className="px-4 py-4 align-middle transition-all duration-300 ease-out group-hover:bg-gray-50/90 group-hover:first:rounded-l-2xl dark:group-hover:bg-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600 dark:bg-navy-900 dark:text-brand-400">
                        {c.name.charAt(0)}
                      </div>
                      <span className="min-w-0 text-sm font-black uppercase tracking-tighter text-brand-900 transition-colors group-hover:text-brand-600 dark:text-white">
                        {c.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-middle transition-all duration-300 ease-out group-hover:bg-gray-50/90 dark:group-hover:bg-white/[0.06]">
                    <span
                      className={`inline-block rounded-lg px-2 py-1 text-[10px] font-black uppercase ${
                        c.category === "HNI"
                          ? "bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300"
                          : c.category === "Corporate"
                            ? "bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300"
                            : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                      }`}
                    >
                      {c.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle text-sm font-bold text-gray-500 transition-all duration-300 ease-out group-hover:bg-gray-50/90 dark:text-gray-400 dark:group-hover:bg-white/[0.06]">
                    {c.city}
                  </td>
                  <td className="px-4 py-4 align-middle text-sm font-black text-brand-700 transition-all duration-300 ease-out group-hover:bg-gray-50/90 dark:text-brand-400 dark:group-hover:bg-white/[0.06]">
                    {c.assets}
                  </td>
                  <td className="px-4 py-4 align-middle text-xs font-bold text-gray-400 transition-all duration-300 ease-out group-hover:bg-gray-50/90 dark:group-hover:bg-white/[0.06]">
                    2 Days ago
                  </td>
                  <td className="px-4 py-4 align-middle text-right transition-all duration-300 ease-out group-hover:bg-gray-50/90 group-hover:last:rounded-r-2xl dark:group-hover:bg-white/[0.06]">
                    <div className="inline-flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(customerList.indexOf(c))}
                        className="rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-200/70 hover:text-[#003366] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                        aria-label="Edit customer"
                      >
                        <MdEdit className="text-lg" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteIndex(customerList.indexOf(c))}
                        className="rounded-md p-1.5 text-red-600 transition-colors hover:bg-red-100/90 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-300"
                        aria-label="Delete customer"
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
      </Card>

      <ConfirmDialog
        open={deleteIndex !== null}
        title="Delete customer?"
        message="Are you sure you want to remove this customer? This action cannot be undone."
        confirmText="Yes, delete"
        cancelText="No"
        onConfirm={performDelete}
        onCancel={() => setDeleteIndex(null)}
      />

      <CrudModal
        open={open}
        title={editIndex === null ? "Add Customer" : "Edit Customer"}
        fields={[
          { key: "name", label: "Name" },
          { key: "category", label: "Category" },
          { key: "city", label: "City" },
          { key: "assets", label: "Assets" },
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

export default Customers;
