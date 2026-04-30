const STORAGE_KEY = "thirukochi-ui-prefs";

const defaultPrefs = {
  dark: false,
  glass: true,
  compactTables: false,
};

export function readUiPrefs() {
  if (typeof window === "undefined") return { ...defaultPrefs };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultPrefs };
    const parsed = JSON.parse(raw);
    return { ...defaultPrefs, ...parsed };
  } catch {
    return { ...defaultPrefs };
  }
}

/** Apply theme flags to <html> (call on load and after every change). */
export function applyUiPrefs(prefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (prefs.dark) root.classList.add("dark");
  else root.classList.remove("dark");
  if (prefs.glass === false) root.setAttribute("data-glass", "off");
  else root.removeAttribute("data-glass");
  if (prefs.compactTables) root.classList.add("crm-compact-tables");
  else root.classList.remove("crm-compact-tables");
}

export function writeUiPrefs(prefs) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* quota or private mode */
  }
  applyUiPrefs(prefs);
  window.dispatchEvent(new CustomEvent("thirukochi-ui-prefs", { detail: prefs }));
}

/** Merge partial prefs, persist, apply, and notify listeners. */
export function patchUiPrefs(partial) {
  const next = { ...readUiPrefs(), ...partial };
  writeUiPrefs(next);
  return next;
}

export function initUiPrefsFromStorage() {
  const prefs = readUiPrefs();
  applyUiPrefs(prefs);
  return prefs;
}
