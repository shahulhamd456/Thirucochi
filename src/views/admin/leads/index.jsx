import React from "react";
import { useLocation } from "react-router-dom";
import Card from "components/card";
import { MdTrendingUp, MdLeaderboard, MdAccessTime, MdFilterList, MdEdit, MdDelete } from "react-icons/md";
import Widget from "components/widget/Widget";
import CrudModal from "components/crud/CrudModal";
import ConfirmDialog from "components/confirm/ConfirmDialog";
import { filterRowsByQuery } from "utils/tableUtils";

const Leads = () => {
  const [leadList, setLeadList] = React.useState([
    { name: "Tech Solutions Inc", product: "Corporate FD", stage: "Proposal", value: "Rs 50 L", probability: "80%" },
    { name: "Anita Kumar", product: "Mutual Funds", stage: "Initial Contact", value: "Rs 5 L", probability: "40%" },
    { name: "Global Exports", product: "General Insurance", stage: "Negotiation", value: "Rs 12 L", probability: "60%" },
    { name: "David Miller", product: "Life Insurance", stage: "Closed", value: "Rs 25 L", probability: "100%" },
  ]);
  const [search, setSearch] = React.useState("");
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(null);
  const [form, setForm] = React.useState({ name: "", product: "", stage: "", value: "", probability: "" });
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const visibleRows = filterRowsByQuery(leadList, search, ["name", "product", "stage", "value", "probability"]);
  React.useEffect(() => {
    setSearch(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);

  const openAdd = () => {
    setEditIndex(null);
    setForm({ name: "", product: "", stage: "", value: "", probability: "" });
    setOpen(true);
  };
  const openEdit = (index) => {
    setEditIndex(index);
    setForm(leadList[index]);
    setOpen(true);
  };
  const onSave = () => {
    if (editIndex === null) setLeadList((prev) => [...prev, form]);
    else setLeadList((prev) => prev.map((row, i) => (i === editIndex ? form : row)));
    setOpen(false);
  };
  const performDelete = () => {
    if (deleteIndex === null) return;
    setLeadList((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <div className="flex items-center gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads" className="h-10 rounded-lg border border-gray-200 px-3 text-xs outline-none dark:border-white/10 dark:bg-navy-900 dark:text-white" />
        <button onClick={openAdd} className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all uppercase">
          Create New Lead
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdLeaderboard />} title="Open Opportunities" subtitle="Rs 1.4 Cr" detail="Across 24 Leads" trend="+15%" />
        <Widget icon={<MdAccessTime />} title="Avg. Cycle" subtitle="14 Days" detail="Nurture to Closure" trend="-2d" />
        <Widget icon={<MdTrendingUp />} title="Conv. Rate" subtitle="22.5%" detail="Last 30 Days" trend="+1.2%" />
        <Widget icon={<MdAccessTime />} title="Follow-ups Due" subtitle="8" detail="Requires Attention" trend="Action" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Pipeline Table */}
        <div className="xl:col-span-8">
          <Card extra="p-4 bg-white dark:bg-navy-800 rounded-[24px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5">
            <h3 className="text-sm font-black text-brand-900 dark:text-white uppercase tracking-tight mb-4">Lead Pipeline</h3>
            <div className="overflow-hidden">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/10">
                    <th className="px-2 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px] whitespace-nowrap text-left">Entity / Name</th>
                    <th className="px-2 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px] whitespace-nowrap text-left">Product Interest</th>
                    <th className="px-2 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px] whitespace-nowrap text-left">Est. Value</th>
                    <th className="px-2 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px] whitespace-nowrap text-left">Probability</th>
                    <th className="px-2 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px] whitespace-nowrap text-left">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((l, i) => (
                    <tr key={i} className="group">
                      <td className="px-2 py-3 align-middle transition-all duration-300 ease-out group-hover:bg-gray-50/10 group-hover:first:rounded-l-2xl">
                        <span className="text-sm font-black text-brand-900 dark:text-white uppercase tracking-tighter">{l.name}</span>
                      </td>
                      <td className="px-2 py-3 align-middle transition-all duration-300 ease-out group-hover:bg-gray-50/10">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{l.product}</span>
                      </td>
                      <td className="px-2 py-3 align-middle transition-all duration-300 ease-out group-hover:bg-gray-50/10">
                        <span className="text-sm font-black text-brand-600 dark:text-brand-400 whitespace-nowrap">{l.value}</span>
                      </td>
                      <td className="px-2 py-3 align-middle transition-all duration-300 ease-out group-hover:bg-gray-50/10">
                        <div className="flex items-center gap-3">
                           <div className="h-1.5 w-16 bg-gray-50 rounded-full overflow-hidden dark:bg-white/10">
                              <div className="h-full bg-brand-500" style={{ width: l.probability }} />
                           </div>
                           <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{l.probability}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 pr-4 align-middle transition-all duration-300 ease-out group-hover:bg-gray-50/10 group-hover:last:rounded-r-2xl">
                        <div className="flex items-center justify-between gap-4">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase whitespace-nowrap shadow-sm ${
                            l.stage === 'Closed' ? 'bg-green-100 text-green-600' : 
                            l.stage === 'Negotiation' ? 'bg-orange-100 text-orange-600' : 'bg-brand-50 text-brand-500'
                          }`}>
                            {l.stage}
                          </span>
                          <div className="flex gap-1.5 transition-all duration-200 text-gray-300 dark:text-gray-600">
                            <button onClick={() => openEdit(leadList.indexOf(l))} className="p-1 hover:text-brand-500 transition-colors"><MdEdit className="h-4 w-4" /></button>
                            <button onClick={() => setDeleteIndex(leadList.indexOf(l))} className="p-1 hover:text-red-500 transition-colors"><MdDelete className="h-4 w-4" /></button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Lead Stats Card */}
        <div className="xl:col-span-4 flex flex-col gap-5">
           <Card extra="relative overflow-hidden rounded-xl border border-cyan-500/20 !bg-[#003366] p-6 text-white shadow-lg dark:!border-cyan-400/20 dark:!bg-[#061f3d] ">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12" />
              <h4 className="mb-4 text-base font-semibold tracking-tight text-white">Conversion tip</h4>
              <p className="mb-6 text-sm font-medium leading-relaxed text-slate-200">
                Leads with "Proposal" stages have an 85% higher conversion rate when followed up within 24 hours of dispatch.
              </p>
              <div className="p-4 rounded-xl bg-white/10 flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-orange-400" />
                 <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-100">3 high-priority follow-ups due</p>
              </div>
           </Card>

           <Card extra="p-6 bg-white dark:bg-navy-800 border border-gray-100 dark:border-white/5 rounded-[32px]">
              <h4 className="text-lg font-black text-brand-900 dark:text-white uppercase mb-4 tracking-tight">Product Interest Mix</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-gray-400">Mutual Funds</span>
                    <span className="text-brand-600 tracking-tighter">45%</span>
                 </div>
                 <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 w-[45%]" />
                 </div>
                 
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase mt-4">
                    <span className="text-gray-400">Insurance</span>
                    <span className="text-brand-600 tracking-tighter">35%</span>
                 </div>
                 <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 w-[35%]" />
                 </div>
              </div>
           </Card>
        </div>
      </div>

      <ConfirmDialog
        open={deleteIndex !== null}
        title="Delete lead?"
        message="Are you sure you want to remove this lead from the pipeline?"
        confirmText="Yes, delete"
        cancelText="No"
        onConfirm={performDelete}
        onCancel={() => setDeleteIndex(null)}
      />

      <CrudModal
        open={open}
        title={editIndex === null ? "Add Lead" : "Edit Lead"}
        fields={[
          { key: "name", label: "Name", full: true },
          { key: "product", label: "Product" },
          { key: "stage", label: "Stage" },
          { key: "value", label: "Value" },
          { key: "probability", label: "Probability" },
        ]}
        values={form}
        onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
        onClose={() => setOpen(false)}
        onSubmit={onSave}
      />
    </div>
  );
};

export default Leads;
