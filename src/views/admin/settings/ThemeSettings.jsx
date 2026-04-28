import React, { useState, useEffect, useCallback } from "react";
import Card from "components/card";
import { MdOutlinePalette } from "react-icons/md";
import { readUiPrefs, patchUiPrefs } from "utils/uiPreferences";

const ThemeSettings = () => {
  const [prefs, setPrefs] = useState(() => readUiPrefs());

  const syncFromStorage = useCallback(() => {
    setPrefs(readUiPrefs());
  }, []);

  useEffect(() => {
    const onPrefs = () => syncFromStorage();
    window.addEventListener("finance-crm-ui-prefs", onPrefs);
    return () => window.removeEventListener("finance-crm-ui-prefs", onPrefs);
  }, [syncFromStorage]);

  const toggleDarkMode = () => {
    const next = patchUiPrefs({ dark: !readUiPrefs().dark });
    setPrefs(next);
  };

  const setGlass = (glass) => {
    const next = patchUiPrefs({ glass });
    setPrefs(next);
  };

  const setCompact = (compactTables) => {
    const next = patchUiPrefs({ compactTables });
    setPrefs(next);
  };

  const resetDefaults = () => {
    const next = patchUiPrefs({
      dark: false,
      glass: true,
      compactTables: false,
    });
    setPrefs(next);
  };

  return (
    <Card extra="relative overflow-hidden rounded-[28px] border border-cyan-500/25 !bg-[#003366] p-6 text-white shadow-lg dark:!border-cyan-400/20 dark:!bg-[#061f3d] sm:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#06B6D4]/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-white/5" />
      <div className="relative z-10 mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#06B6D4]/20 text-[#06B6D4]">
          <MdOutlinePalette className="text-xl" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-white">Theme & display</h3>
      </div>
      <p className="relative z-10 mb-5 text-[10px] font-medium leading-relaxed text-white/70">
        Preferences are saved in this browser and applied immediately (navbar blur, table density, dark mode).
      </p>
      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/5 px-3 py-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">Dark mode</span>
          <button
            type="button"
            role="switch"
            aria-checked={prefs.dark}
            onClick={toggleDarkMode}
            className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 ring-2 ring-inset transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#003366] ${
              prefs.dark ? "justify-end bg-[#06B6D4] ring-cyan-200/40" : "justify-start bg-slate-700 ring-white/35"
            }`}
          >
            <span className="h-5 w-5 rounded-full bg-white shadow-md" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setGlass(!prefs.glass)}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-left transition-colors hover:bg-white/10"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">Glass-style panels</span>
          <span className={`text-xs font-bold tabular-nums ${prefs.glass ? "text-[#06B6D4]" : "text-slate-300"}`}>
            {prefs.glass ? "On" : "Off"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setCompact(!prefs.compactTables)}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-left transition-colors hover:bg-white/10"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">Compact data tables</span>
          <span className={`text-xs font-bold tabular-nums ${prefs.compactTables ? "text-[#06B6D4]" : "text-slate-300"}`}>
            {prefs.compactTables ? "On" : "Off"}
          </span>
        </button>
        <div className="my-2 h-px bg-white/15" />
        <button
          type="button"
          onClick={resetDefaults}
          className="w-full rounded-lg border border-white/20 bg-white/10 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-all hover:bg-white/20"
        >
          Reset theme to defaults
        </button>
      </div>
    </Card>
  );
};

export default ThemeSettings;
