import React, { useState } from "react";
import Card from "components/card";
import CrudModal from "components/crud/CrudModal";
import ConfirmDialog from "components/confirm/ConfirmDialog";
import {
  MdNotifications,
  MdCheckCircle,
  MdWarning,
  MdInfo,
  MdOutlineDoneAll,
  MdAdd,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import Widget from "components/widget/Widget";

const Notifications = () => {
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [emailDigests, setEmailDigests] = useState([
    { id: "d1", label: "Weekly market summary", schedule: "Every Monday 8:00", enabled: true },
    { id: "d2", label: "Policy renewal reminders", schedule: "Instant", enabled: true },
    { id: "d3", label: "Product announcements", schedule: "First of month", enabled: false },
  ]);
  const [digestModalOpen, setDigestModalOpen] = useState(false);
  const [editingDigestId, setEditingDigestId] = useState(null);
  const [digestForm, setDigestForm] = useState({ label: "", schedule: "", status: "Active" });
  const [deleteDigestId, setDeleteDigestId] = useState(null);

  const openAddDigest = () => {
    setEditingDigestId(null);
    setDigestForm({ label: "", schedule: "", status: "Active" });
    setDigestModalOpen(true);
  };

  const openEditDigest = (row) => {
    setEditingDigestId(row.id);
    setDigestForm({
      label: row.label,
      schedule: row.schedule,
      status: row.enabled ? "Active" : "Paused",
    });
    setDigestModalOpen(true);
  };

  const saveDigest = () => {
    const enabled = digestForm.status.toLowerCase() !== "paused";
    if (editingDigestId) {
      setEmailDigests((prev) =>
        prev.map((d) =>
          d.id === editingDigestId
            ? { ...d, label: digestForm.label.trim(), schedule: digestForm.schedule.trim(), enabled }
            : d
        )
      );
    } else {
      setEmailDigests((prev) => [
        ...prev,
        {
          id: `d-${Date.now()}`,
          label: digestForm.label.trim() || "New digest",
          schedule: digestForm.schedule.trim() || "Weekly",
          enabled,
        },
      ]);
    }
    setDigestModalOpen(false);
  };

  const performDeleteDigest = () => {
    if (deleteDigestId === null) return;
    setEmailDigests((prev) => prev.filter((d) => d.id !== deleteDigestId));
    setDeleteDigestId(null);
  };

  const toggleDigest = (id) => {
    setEmailDigests((prev) => prev.map((d) => (d.id === id ? { ...d, enabled: !d.enabled } : d)));
  };

  const alerts = [
    { title: "SIP Installment Processed", time: "2 Hours ago", type: "Success", desc: "Your SIP for HDFC Top 100 has been successfully debited.", icon: <MdCheckCircle /> },
    { title: "Policy Renewal Due", time: "5 Hours ago", type: "Warning", desc: "Life Insurance policy #TFS-9921 is due for renewal in 48 hours.", icon: <MdWarning /> },
    { title: "System Maintenance", time: "1 Day ago", type: "Info", desc: "Our servers will be undergoing scheduled maintenance this Sunday.", icon: <MdInfo /> },
    { title: "AUM Target Reached", time: "2 Days ago", type: "Success", desc: "Congratulations! Your portfolio has crossed the Rs 5.0 Cr milestone.", icon: <MdCheckCircle /> },
  ];

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <button className="flex items-center gap-2 rounded-2xl border border-brand-100 px-6 py-3 font-black text-xs uppercase text-brand-900 transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5">
          <MdOutlineDoneAll className="text-lg" /> Mark All as Read
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdNotifications />} title="Total Alerts" subtitle="42" detail="12 New Today" trend="+5" />
        <Widget icon={<MdCheckCircle className="text-green-500" />} title="Successful" subtitle="38" detail="Transaction related" trend="95%" />
        <Widget icon={<MdWarning className="text-orange-500" />} title="Action Items" subtitle="3" detail="Policy Renewals" trend="Urgent" />
        <Widget icon={<MdInfo className="text-brand-500" />} title="Information" subtitle="1" detail="System Updates" trend="Live" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <Card extra="p-8 bg-white dark:bg-navy-800 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5 h-full">
             <h3 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tight mb-8">Recent Notifications</h3>
             <div className="space-y-4">
                {alerts.map((alert, i) => (
                  <div key={i} className="group p-5 rounded-2xl bg-gray-50/50 dark:bg-navy-900/50 hover:bg-white dark:hover:bg-navy-800 border border-transparent hover:border-brand-100 dark:hover:border-white/5 transition-all cursor-pointer">
                     <div className="flex gap-4">
                        <div className={`h-11 w-11 flex items-center justify-center rounded-xl text-xl ${
                          alert.type === 'Success' ? 'bg-green-50 text-green-500' : 
                          alert.type === 'Warning' ? 'bg-orange-50 text-orange-500' : 'bg-brand-50 text-brand-500'
                        }`}>
                          {alert.icon}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-1">
                              <h4 className="text-sm font-black text-brand-900 dark:text-white uppercase tracking-tighter group-hover:text-brand-600 transition-colors">{alert.title}</h4>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{alert.time}</span>
                           </div>
                           <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{alert.desc}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
             <div className="mt-8 pt-6 border-t border-gray-50 dark:border-white/5 text-center">
                <button className="text-xs font-black text-brand-500 uppercase tracking-widest hover:underline">Load Older Notifications</button>
             </div>
          </Card>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-5">
           <Card extra="relative overflow-hidden rounded-xl !border !border-cyan-500/25 !bg-[#003366] p-6 text-white shadow-lg dark:!border-cyan-400/20 dark:!bg-[#061f3d]">
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#06B6D4]/20 blur-2xl" />
              <div className="relative z-10 mb-4 flex flex-wrap items-start justify-between gap-3">
                <h4 className="text-base font-semibold tracking-tight text-white">Email preferences</h4>
                <button
                  type="button"
                  onClick={openAddDigest}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-cyan-400/40 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-cyan-100 transition-colors hover:bg-white/20"
                >
                  <MdAdd className="text-base" />
                  Add
                </button>
              </div>
              <p className="relative z-10 mb-5 text-sm leading-relaxed text-slate-200">
                Receive weekly financial health summaries and market insights directly in your inbox.
              </p>
              <div className="relative z-10 mb-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                 <button
                    type="button"
                    role="switch"
                    aria-checked={weeklySummary}
                    onClick={() => setWeeklySummary(!weeklySummary)}
                    className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 ring-2 transition-colors focus:outline-none focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#003366] ${
                      weeklySummary ? "justify-end bg-[#06B6D4] ring-cyan-200/40" : "justify-start bg-slate-700 ring-white/35"
                    }`}
                 >
                    <span className="h-5 w-5 rounded-full bg-white shadow-md" />
                 </button>
                 <span className={`min-w-0 text-xs font-semibold uppercase tracking-wide ${weeklySummary ? "text-[#a5f3fc]" : "text-slate-300"}`}>
                    {weeklySummary ? "Weekly summary on" : "Weekly summary off"}
                 </span>
              </div>

              <p className="relative z-10 mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-300">Email digests</p>
              <ul className="relative z-10 space-y-2">
                {emailDigests.map((d) => (
                  <li
                    key={d.id}
                    className="flex flex-col gap-2 rounded-lg border border-white/15 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{d.label}</p>
                      <p className="text-xs text-slate-300">{d.schedule}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={d.enabled}
                        onClick={() => toggleDigest(d.id)}
                        title={d.enabled ? "Turn off" : "Turn on"}
                        className={`flex h-6 w-10 items-center rounded-full p-0.5 ring-2 transition-colors ${
                          d.enabled ? "justify-end bg-[#06B6D4] ring-cyan-200/30" : "justify-start bg-slate-700 ring-white/30"
                        }`}
                      >
                        <span className="h-4 w-4 rounded-full bg-white shadow" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditDigest(d)}
                        className="rounded-md p-1.5 text-cyan-100 hover:bg-white/10"
                        aria-label="Edit digest"
                      >
                        <MdEdit className="text-lg" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteDigestId(d.id)}
                        className="rounded-md p-1.5 text-red-200 hover:bg-red-500/20"
                        aria-label="Delete digest"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
           </Card>

           <ConfirmDialog
             open={deleteDigestId !== null}
             title="Delete email digest?"
             message="Remove this digest from your email preferences?"
             confirmText="Yes, delete"
             cancelText="No"
             onConfirm={performDeleteDigest}
             onCancel={() => setDeleteDigestId(null)}
           />

           <CrudModal
             open={digestModalOpen}
             title={editingDigestId ? "Edit email digest" : "Add email digest"}
             fields={[
               { key: "label", label: "Digest name", full: true },
               { key: "schedule", label: "Schedule (e.g. Every Monday 8:00)", full: true },
               { key: "status", label: "Status (Active or Paused)" },
             ]}
             values={digestForm}
             onChange={(key, value) => setDigestForm((prev) => ({ ...prev, [key]: value }))}
             onClose={() => setDigestModalOpen(false)}
             onSubmit={saveDigest}
           />

           <Card extra="p-6 bg-white dark:bg-navy-800 border border-gray-100 dark:border-white/5 rounded-[32px] ">
              <h4 className="text-lg font-black text-brand-900 dark:text-white uppercase mb-4 tracking-tight">Security Alerts</h4>
              <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100/50 flex gap-4">
                 <MdWarning className="text-2xl text-orange-500" />
                 <div>
                    <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest leading-none mb-1">Unauthorized Login</p>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Failed attempt from IP: 192.XXX.X to Finance CRM Admin Portal.</p>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
