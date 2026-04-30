const PROFILE_STORAGE_KEY = "thirukochi-profile";

const defaultForm = {
  fullName: "Robert Brown",
  email: "robert@financecrm.com",
  firmName: "Thirukochi Advisory",
  amfiRegNo: "ARN-122455",
  phone: "+91 98765 43210",
  designation: "Senior Wealth Advisor",
  website: "https://financecrm-advisory.example.com",
  officeCity: "Mumbai",
  bio: "SEBI-registered distributor focusing on goal-based planning for families and HNIs.",
  irdaLicense: "IRDAI-L-123456",
  sebiRegNo: "INA000012345",
  timezone: "Asia/Kolkata",
  language: "en-IN",
};

export function loadProfileFromStorage() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveProfileToStorage(payload) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function getDefaultFormData() {
  return { ...defaultForm };
}

export function mergeStoredProfile(stored) {
  if (!stored || typeof stored !== "object") {
    return {
      formData: { ...defaultForm },
      showArnStatus: true,
      showFirmPublic: true,
      showPhonePublic: false,
      avatarDataUrl: null,
    };
  }
  return {
    formData: { ...defaultForm, ...(stored.formData || {}) },
    showArnStatus: stored.showArnStatus !== false,
    showFirmPublic: stored.showFirmPublic !== false,
    showPhonePublic: Boolean(stored.showPhonePublic),
    avatarDataUrl: typeof stored.avatarDataUrl === "string" ? stored.avatarDataUrl : null,
  };
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
