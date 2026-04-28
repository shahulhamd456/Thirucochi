import React from "react";
import { useLocation } from "react-router-dom";
import Card from "components/card";
import { MdGroup, MdPersonPin, MdEmail, MdPhone, MdDelete, MdEdit } from "react-icons/md";
import Widget from "components/widget/Widget";
import CrudModal from "components/crud/CrudModal";
import ConfirmDialog from "components/confirm/ConfirmDialog";
import { filterRowsByQuery } from "utils/tableUtils";

const StaffPhoto = ({ name, photo }) => {
  const [failed, setFailed] = React.useState(false);
  const url = typeof photo === "string" ? photo.trim() : "";
  const showImg =
    (url.startsWith("http") || url.startsWith("data:image")) && !failed;

  React.useEffect(() => {
    setFailed(false);
  }, [url]);

  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-brand-50 ring-2 ring-gray-100 shadow-md dark:bg-navy-900 dark:ring-white/10">
      {showImg ? (
        <img
          src={url}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xl font-black text-brand-600">
          {name.charAt(0)}
        </div>
      )}
    </div>
  );
};

const Staff = () => {
  const [staffMembers, setStaffMembers] = React.useState([
    {
      name: "Johncy John",
      role: "MD & Principal Advisor",
      dept: "Leadership",
      email: "johncy@financecrm.com",
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Adela Parkson",
      role: "Senior Developer",
      dept: "Tech Support",
      email: "adela@financecrm.com",
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Rahul Singhal",
      role: "Relationship Manager",
      dept: "Sales",
      email: "rahul@financecrm.com",
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Arun Yadav",
      role: "Support Executive",
      dept: "Customer Care",
      email: "arun@financecrm.com",
      status: "On Leave",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    },
  ]);
  const [search, setSearch] = React.useState("");
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(null);
  const [form, setForm] = React.useState({ name: "", role: "", dept: "", email: "", status: "Active", photo: "" });
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const visibleRows = filterRowsByQuery(staffMembers, search, ["name", "role", "dept", "email", "status"]);
  React.useEffect(() => {
    setSearch(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);
  const openAdd = () => {
    setEditIndex(null);
    setForm({ name: "", role: "", dept: "", email: "", status: "Active", photo: "" });
    setOpen(true);
  };
  const openEdit = (index) => {
    setEditIndex(index);
    const row = staffMembers[index];
    setForm({ ...row, photo: row.photo ?? "" });
    setOpen(true);
  };
  const onSave = () => {
    const row = { ...form, photo: form.photo?.trim() || "" };
    if (editIndex === null) setStaffMembers((prev) => [row, ...prev]);
    else setStaffMembers((prev) => prev.map((r, i) => (i === editIndex ? row : r)));
    setOpen(false);
  };
  const performDelete = () => {
    if (deleteIndex === null) return;
    setStaffMembers((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-end mb-8">
        <div className="flex items-center gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search staff" className="h-10 rounded-lg border border-gray-200 px-3 text-xs outline-none dark:border-white/10 dark:bg-navy-900 dark:text-white" />
        <button onClick={openAdd} className="px-6 py-3 bg-[#003366] text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-900/20 hover:scale-[1.02] active:scale-95 transition-all uppercase">
          Add Staff Member
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Widget icon={<MdGroup />} title="Total Staff" subtitle="24" detail="6 Departments" trend="+2" />
        <Widget icon={<MdPersonPin />} title="Advisor Count" subtitle="12" detail="AMFI Certified" trend="0" />
        <Widget icon={<MdGroup />} title="Retention" subtitle="95%" detail="Employee Satisfaction" trend="+2%" />
        <Widget icon={<MdGroup />} title="Open Positions" subtitle="3" detail="Hiring for Sales" trend="Urgent" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {visibleRows.map((member, i) => (
          <Card key={i} extra="p-6 bg-white dark:bg-navy-800 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-2xl shadow-brand-500/5 hover:translate-y-[-5px] transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
               <StaffPhoto name={member.name} photo={member.photo} />
               <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                  member.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
               }`}>
                  {member.status}
               </span>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-black text-brand-900 dark:text-white uppercase tracking-tighter group-hover:text-brand-600 transition-colors">{member.name}</h4>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">{member.role}</p>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-white/5">
               <div className="flex items-center gap-3 text-gray-500 hover:text-brand-500 transition-colors cursor-pointer">
                  <MdEmail className="text-lg" />
                  <span className="text-xs font-bold">{member.email}</span>
               </div>
               <div className="flex items-center gap-3 text-gray-500">
                  <MdPhone className="text-lg" />
                  <span className="text-xs font-bold font-mono text-brand-600">+91 989XXXXXX0</span>
               </div>
            </div>

            <div className="mt-6 flex gap-2">
               <button className="flex-1 py-2 rounded-xl bg-gray-50 dark:bg-navy-900 text-[10px] font-black uppercase text-gray-400 hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-white/10 dark:hover:text-cyan-300 transition-all">View Performance</button>
              <button onClick={() => openEdit(staffMembers.indexOf(member))} className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-navy-900 text-gray-400 hover:bg-brand-50/80 hover:text-brand-500 dark:hover:bg-white/10 dark:hover:text-cyan-300 transition-all"><MdEdit /></button>
              <button onClick={() => setDeleteIndex(staffMembers.indexOf(member))} className="px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/25 transition-all"><MdDelete /></button>
            </div>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={deleteIndex !== null}
        title="Remove staff member?"
        message="Are you sure you want to delete this person from the team list?"
        confirmText="Yes, delete"
        cancelText="No"
        onConfirm={performDelete}
        onCancel={() => setDeleteIndex(null)}
      />

      <CrudModal
        open={open}
        title={editIndex === null ? "Add Staff" : "Edit Staff"}
        fields={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "dept", label: "Department" },
          { key: "email", label: "Email" },
          {
            key: "photo",
            label: "Staff photo",
            full: true,
            imageUpload: true,
            maxFileMb: 2,
            placeholder: "https://…",
          },
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

export default Staff;
