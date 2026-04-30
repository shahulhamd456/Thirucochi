import React, { useState, useRef, useMemo } from "react";
import Card from "components/card";
import {
  MdPublic,
  MdPhone,
  MdWork,
  MdLanguage,
  MdSchedule,
  MdPhotoCamera,
  MdBadge,
  MdBusiness,
  MdKeyboardArrowDown,
} from "react-icons/md";
import {
  loadProfileFromStorage,
  mergeStoredProfile,
  saveProfileToStorage,
  readFileAsDataUrl,
} from "utils/profileSettingsStore";
import { useAuth } from "contexts/AuthContext";

function initialsFromName(name) {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const stored = useMemo(() => mergeStoredProfile(loadProfileFromStorage()), []);

  const [saveStatus, setSaveStatus] = useState("idle");
  const [saveError, setSaveError] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(stored.avatarDataUrl);

  const [formData, setFormData] = useState(stored.formData);
  const [showArnStatus, setShowArnStatus] = useState(stored.showArnStatus);
  const [showFirmPublic, setShowFirmPublic] = useState(stored.showFirmPublic);
  const [showPhonePublic, setShowPhonePublic] = useState(stored.showPhonePublic);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaveStatus("saving");
    let avatarDataUrl = null;
    if (avatarPreview?.startsWith("data:")) {
      avatarDataUrl = avatarPreview;
    } else if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      if (file.size > 450000) {
        setSaveStatus("idle");
        setSaveError("Image is too large to store in the browser (try under 450 KB).");
        return;
      }
      try {
        avatarDataUrl = await readFileAsDataUrl(file);
      } catch {
        setSaveStatus("idle");
        setSaveError("Could not read the image file.");
        return;
      }
    }

    const payload = {
      formData,
      showArnStatus,
      showFirmPublic,
      showPhonePublic,
      avatarDataUrl,
    };
    const ok = saveProfileToStorage(payload);
    if (!ok) {
      setSaveStatus("idle");
      setSaveError("Could not save (storage unavailable or full).");
      return;
    }

    // Sync with global AuthContext
    updateUser({
       name: formData.fullName,
       role: formData.designation,
       email: formData.email,
       avatar: avatarDataUrl || (avatarPreview && !avatarPreview.startsWith('blob:') ? avatarPreview : user?.avatar)
    });

    if (avatarDataUrl) {
      setAvatarPreview((prev) => {
        if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
        return avatarDataUrl;
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-brand-900 dark:text-white">Profile</h2>
          <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            Identity, firm details, and how you appear to clients and on the public directory.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {saveError && (
            <p className="max-w-md text-right text-xs font-semibold text-red-500 dark:text-red-400">{saveError}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="space-y-8 xl:col-span-8">
          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <div className="mb-6 flex items-center justify-between sm:mb-8">
              <h3 className="text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">
                Photo & identity
              </h3>
              <button
                type="button"
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className={`flex h-9 items-center justify-center gap-2 rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-70 ${
                  saveStatus === "saved"
                    ? "bg-green-500 text-white"
                    : "bg-[#003366] text-white hover:bg-[#004488]"
                }`}
              >
                {saveStatus === "saving" ? (
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : saveStatus === "saved" ? (
                  "Saved"
                ) : (
                  "Save Card"
                )}
              </button>
            </div>
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative shrink-0">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-2 border-gray-100 bg-gray-50 dark:border-navy-600 dark:bg-navy-900">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-gray-300 dark:text-navy-600">
                      {initialsFromName(formData.fullName)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-white bg-[#003366] text-white shadow-lg dark:border-navy-800"
                  aria-label="Change profile photo"
                >
                  <MdPhotoCamera className="text-xl" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-sm font-bold text-brand-900 dark:text-white">Profile photo</p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  JPG or PNG, up to 5 MB. Shown in the app header and optional on your public directory card.
                </p>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview((prev) => {
                        if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
                        return null;
                      });
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="mt-2 text-xs font-bold uppercase tracking-wide text-brand-600 hover:underline dark:text-cyan-400"
                  >
                    Remove photo
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Designation</label>
                <div className="relative">
                  <MdWork className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-3 pl-11 pr-4 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</label>
                <div className="relative">
                  <MdPhone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-3 pl-11 pr-4 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Professional bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={500}
                  className="w-full resize-y rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium leading-relaxed text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
                <p className="mt-1 px-1 text-right text-[10px] font-bold text-gray-400">{formData.bio.length}/500</p>
              </div>
            </div>
          </Card>

          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white sm:mb-8">
              <MdBusiness className="text-2xl text-brand-600 dark:text-brand-400" />
              Firm & office
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Firm name</label>
                <input
                  type="text"
                  name="firmName"
                  value={formData.firmName}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Primary office city</label>
                <input
                  type="text"
                  name="officeCity"
                  value={formData.officeCity}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Website or booking link</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
              </div>
            </div>
          </Card>

          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white sm:mb-8">
              <MdBadge className="text-2xl text-brand-600 dark:text-brand-400" />
              Regulatory & compliance IDs
            </h3>
            <p className="mb-6 text-xs font-medium text-gray-500 dark:text-gray-400">
              Used for disclosures and audit trails. Keep these aligned with your live registrations.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">AMFI ARN / EUIN</label>
                <input
                  type="text"
                  name="amfiRegNo"
                  value={formData.amfiRegNo}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">IRDAI license (if applicable)</label>
                <input
                  type="text"
                  name="irdaLicense"
                  value={formData.irdaLicense}
                  onChange={handleInputChange}
                  placeholder="—"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">SEBI investment advisor reg. (if applicable)</label>
                <input
                  type="text"
                  name="sebiRegNo"
                  value={formData.sebiRegNo}
                  onChange={handleInputChange}
                  placeholder="—"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8 xl:col-span-4">
          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <MdSchedule className="text-xl text-brand-600 dark:text-brand-400" />
              <h4 className="text-sm font-black uppercase tracking-tight text-brand-900 dark:text-white">Regional</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Time zone</label>
                <CustomSelect
                  icon={MdSchedule}
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  options={[
                    { value: "Asia/Kolkata", label: "India (IST)" },
                    { value: "Asia/Dubai", label: "Gulf (GST)" },
                    { value: "Asia/Singapore", label: "Singapore" },
                    { value: "Europe/London", label: "UK" },
                    { value: "America/New_York", label: "US Eastern" }
                  ]}
                />
              </div>
              <div>
                <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Language</label>
                <CustomSelect
                  icon={MdLanguage}
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  options={[
                    { value: "en-IN", label: "English (India)" },
                    { value: "hi", label: "Hindi" },
                    { value: "en-US", label: "English (US)" }
                  ]}
                />
              </div>
            </div>
            <p className="mt-4 text-[10px] font-medium leading-relaxed text-gray-400">
              Affects date formats, default meeting slots, and exported report timestamps.
            </p>
          </Card>

          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <MdPublic className="text-2xl text-brand-600 dark:text-brand-400" />
              <h4 className="text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">Public directory</h4>
            </div>
            <p className="mb-6 text-xs font-medium leading-relaxed text-gray-500 dark:text-gray-400">
              Control how your advisor profile appears on the Thirukochi investor directory.
            </p>
            <div className="space-y-3">
              <ToggleRow label="Show ARN / EUIN on card" on={showArnStatus} onToggle={() => setShowArnStatus(!showArnStatus)} />
              <ToggleRow label="Show firm name publicly" on={showFirmPublic} onToggle={() => setShowFirmPublic(!showFirmPublic)} />
              <ToggleRow label="Show business phone on card" on={showPhonePublic} onToggle={() => setShowPhonePublic(!showPhonePublic)} />
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
};

function ToggleRow({ label, on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-gray-50 p-4 text-left transition-colors hover:bg-gray-100 dark:bg-navy-900 dark:hover:bg-navy-700/50"
    >
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">{label}</span>
      <div className={`h-5 w-9 rounded-full p-0.5 transition-colors duration-300 ${on ? "bg-brand-600 dark:bg-brand-400" : "bg-gray-200 dark:bg-navy-700"}`}>
        <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 ${on ? "translate-x-4" : "translate-x-0"}`} />
      </div>
    </button>
  );
}

export default ProfileSettings;

function CustomSelect({ icon: Icon, options, value, onChange, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative w-full cursor-pointer" ref={containerRef}>
      <div
        className="flex min-h-[48px] w-full items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 py-3 pl-11 pr-4 text-sm font-bold text-brand-900 shadow-sm transition-all hover:bg-white focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white dark:hover:bg-navy-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {Icon && <Icon className="pointer-events-none absolute left-3 w-5 h-5 -translate-y-0 text-gray-400" />}
        <span className="select-none">{selectedOption?.label}</span>
        <MdKeyboardArrowDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-500" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-[100] mt-2 mb-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-xl py-2 shadow-2xl dark:border-white/10 dark:bg-navy-800/95 custom-scrollbar">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                className={`flex items-center px-4 py-3 text-sm font-bold transition-all hover:bg-[#003366] hover:pl-6 hover:text-white select-none ${
                  isSelected
                    ? "bg-brand-50/50 text-[#003366] dark:bg-navy-900/50 dark:text-cyan-300"
                    : "text-brand-900 dark:text-white"
                }`}
                onClick={() => {
                  onChange({ target: { name, value: option.value } });
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
