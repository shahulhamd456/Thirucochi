import React from "react";
import { useLocation } from "react-router-dom";
import Card from "components/card";
import { MdAssessment, MdOutlinePictureAsPdf, MdOutlineTableChart, MdFileDownload, MdEdit, MdDelete } from "react-icons/md";
import Widget from "components/widget/Widget";
import CrudModal from "components/crud/CrudModal";
import ConfirmDialog from "components/confirm/ConfirmDialog";
import { exportRowsToCsv, filterRowsByQuery } from "utils/tableUtils";
import { DT_WRAP, DT_TABLE, DT_TH, TD, TD_1, TD_END_R } from "utils/dataTableStyles";

const Reports = () => {
  const [reports, setReports] = React.useState([
    { title: "Annual Investment Summary", date: "2025-26", format: "PDF", size: "4.2 MB", category: "Portfolio", fileData: "", fileName: "" },
    { title: "Quarterly GST Filing", date: "Q3 2025", format: "XLSX", size: "1.1 MB", category: "Taxation", fileData: "", fileName: "" },
    { title: "Insurance Premium Ledger", date: "2026-04", format: "PDF", size: "850 KB", category: "Insurance", fileData: "", fileName: "" },
    { title: "Client Performance Audit", date: "Mar 2026", format: "PDF", size: "12.4 MB", category: "Audit", fileData: "", fileName: "" },
  ]);
  const [search, setSearch] = React.useState("");
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(null);
  const [form, setForm] = React.useState({
    title: "",
    date: "",
    format: "PDF",
    size: "",
    category: "",
    fileData: "",
    fileName: "",
  });
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const visibleRows = filterRowsByQuery(reports, search, ["title", "date", "format", "size", "category"]);
  React.useEffect(() => {
    setSearch(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);
  const openAdd = () => {
    setEditIndex(null);
    setForm({ title: "", date: "", format: "PDF", size: "", category: "", fileData: "", fileName: "" });
    setOpen(true);
  };
  const openEdit = (index) => {
    setEditIndex(index);
    const row = reports[index];
    setForm({
      ...row,
      fileData: row.fileData ?? "",
      fileName: row.fileName ?? "",
    });
    setOpen(true);
  };

  const downloadReportFile = (r) => {
    if (!r.fileData || typeof r.fileData !== "string" || !r.fileData.startsWith("data:")) return;
    const ext =
      r.format === "PDF"
        ? ".pdf"
        : r.format === "XLSX"
          ? ".xlsx"
          : r.format === "XLS"
            ? ".xls"
            : r.format === "CSV"
              ? ".csv"
              : "";
    const base = (r.fileName || r.title || "report").replace(/[/\\?%*:|"<>]/g, "-").slice(0, 80);
    const a = document.createElement("a");
    a.href = r.fileData;
    a.download = base.includes(".") ? base : `${base}${ext || ".bin"}`;
    a.rel = "noopener";
    a.click();
  };
  const onSave = () => {
    if (editIndex === null) setReports((prev) => [form, ...prev]);
    else setReports((prev) => prev.map((row, i) => (i === editIndex ? form : row)));
    setOpen(false);
  };
  const performDelete = () => {
    if (deleteIndex === null) return;
    setReports((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <div className="flex items-center gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reports" className="h-10 rounded-lg border border-gray-200 px-3 text-xs outline-none dark:border-white/10 dark:bg-navy-900 dark:text-white" />
        <button onClick={() => exportRowsToCsv(visibleRows, [{ key: "title", label: "Title" }, { key: "date", label: "Timeline" }, { key: "format", label: "Format" }, { key: "size", label: "Size" }, { key: "category", label: "Category" }], "reports.csv")} className="px-4 py-3 border border-gray-200 dark:border-white/10 rounded-2xl font-black text-xs text-brand-900 dark:text-white uppercase transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
          Export CSV
        </button>
        <button onClick={openAdd} className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all uppercase">
          Generate custom report
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdAssessment />} title="Generated YTD" subtitle="124" detail="Across all modules" trend="+12" />
        <Widget icon={<MdFileDownload />} title="Total Downloads" subtitle="842" detail="Client Portals" trend="+24%" />
        <Widget icon={<MdOutlineTableChart />} title="Scheduled" subtitle="12" detail="Automated Delivery" trend="Live" />
        <Widget icon={<MdOutlinePictureAsPdf />} title="Storage Used" subtitle="2.4 GB" detail="Report Archive" trend="Standard" />
      </div>

      <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
         <h3 className="mb-6 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white sm:mb-8">Generated Reports Archive</h3>
         <div className={DT_WRAP}>
            <table className={DT_TABLE}>
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10">
                  <th className={`${DT_TH} w-[38%]`}>Report Title</th>
                  <th className={DT_TH}>Timeline</th>
                  <th className={DT_TH}>Format</th>
                  <th className={DT_TH}>Size</th>
                  <th className={`${DT_TH} text-right`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r) => (
                  <tr key={`${r.title}-${r.date}`} className="group">
                    <td className={TD_1}>
                       <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                            r.format === "PDF" ? "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400" : "bg-green-50 text-green-500 dark:bg-green-900/30 dark:text-green-400"
                          }`}>
                            {r.format}
                          </div>
                          <div className="min-w-0">
                             <p className="text-sm font-black uppercase tracking-tighter text-brand-900 dark:text-white">{r.title}</p>
                             <p className="mt-1 text-[10px] font-bold uppercase leading-snug tracking-widest text-gray-400">{r.category}</p>
                          </div>
                       </div>
                    </td>
                    <td className={`${TD} text-sm font-bold text-gray-600 dark:text-gray-300`}>{r.date}</td>
                    <td className={TD}>
                       <span className="text-xs font-black text-gray-500 dark:text-gray-400">{r.format}</span>
                    </td>
                    <td className={`${TD} text-xs font-bold text-gray-400`}>{r.size}</td>
                    <td className={TD_END_R}>
                       <div className="inline-flex items-center justify-end gap-1">
                       <button
                         type="button"
                         onClick={() => downloadReportFile(r)}
                         disabled={!r.fileData?.startsWith?.("data:")}
                         className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all hover:bg-[#003366] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 dark:bg-navy-800 dark:text-cyan-300 dark:hover:bg-cyan-500/25 dark:hover:text-white"
                         title={r.fileData?.startsWith?.("data:") ? "Download uploaded file" : "No file attached — add one when editing"}
                         aria-label="Download report file"
                       >
                          <MdFileDownload className="text-lg" />
                       </button>
                       <button type="button" onClick={() => openEdit(reports.indexOf(r))} className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-200/70 hover:text-[#003366] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Edit"><MdEdit /></button>
                       <button type="button" onClick={() => setDeleteIndex(reports.indexOf(r))} className="rounded-md p-2 text-red-600 transition-colors hover:bg-red-100/90 dark:text-red-400 dark:hover:bg-red-500/20 dark:hover:text-red-300" aria-label="Delete"><MdDelete /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </Card>

      <ConfirmDialog
        open={deleteIndex !== null}
        title="Delete report?"
        message="Are you sure you want to remove this report from the archive?"
        confirmText="Yes, delete"
        cancelText="No"
        onConfirm={performDelete}
        onCancel={() => setDeleteIndex(null)}
      />

      <CrudModal
        open={open}
        title={editIndex === null ? "Add Report" : "Edit Report"}
        fields={[
          { key: "title", label: "Report Title", full: true },
          {
            key: "fileData",
            label: "Report file",
            full: true,
            fileUpload: true,
            fileNameKey: "fileName",
            maxFileMb: 15,
            accept: ".pdf,.xlsx,.xls,.csv,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv",
            hint: "Upload PDF, Excel, or CSV (max 15 MB). Format and size update automatically.",
          },
          { key: "date", label: "Timeline" },
          { key: "format", label: "Format" },
          { key: "size", label: "Size" },
          { key: "category", label: "Category" },
        ]}
        values={form}
        onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
        onClose={() => setOpen(false)}
        onSubmit={onSave}
      />
    </div>
  );
};

export default Reports;
