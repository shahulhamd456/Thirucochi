import React, { useState, useMemo, useEffect } from "react";
import Card from "components/card";
import {
  MdLock,
  MdFingerprint,
  MdVisibility,
  MdVisibilityOff,
  MdVpnKey,
  MdDevices,
  MdLogout,
  MdShield,
  MdGppGood,
  MdWarning,
  MdEmail,
} from "react-icons/md";

const SECURITY_PREFS_KEY = "finance-crm-security-prefs";

const MOCK_SESSIONS = [
  { id: "1", label: "Chrome on Windows", detail: "Mumbai · Active now", current: true },
  { id: "2", label: "Finance CRM mobile", detail: "Last active 2 days ago", current: false },
  { id: "3", label: "Safari on Mac", detail: "Last active 12 days ago", current: false },
];

function loadSecurityPrefs() {
  try {
    const raw = localStorage.getItem(SECURITY_PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveSecurityPrefs(prefs) {
  try {
    localStorage.setItem(SECURITY_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

function generateBackupCodes() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const codes = [];
  for (let n = 0; n < 10; n++) {
    let a = "";
    let b = "";
    for (let i = 0; i < 4; i++) a += chars[Math.floor(Math.random() * chars.length)];
    for (let i = 0; i < 4; i++) b += chars[Math.floor(Math.random() * chars.length)];
    codes.push(`${a}-${b}`);
  }
  return codes;
}

function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 4);
}

const SecuritySettings = () => {
  const mergedPrefs = useMemo(() => {
    const stored = loadSecurityPrefs();
    return {
      twoFactorAuth: stored.twoFactorAuth !== false,
      biometricAccess: Boolean(stored.biometricAccess),
      loginAlerts: stored.loginAlerts !== false,
      suspiciousLock: stored.suspiciousLock !== false,
    };
  }, []);

  const [twoFactorAuth, setTwoFactorAuth] = useState(mergedPrefs.twoFactorAuth);
  const [biometricAccess, setBiometricAccess] = useState(mergedPrefs.biometricAccess);
  const [loginAlerts, setLoginAlerts] = useState(mergedPrefs.loginAlerts);
  const [suspiciousLock, setSuspiciousLock] = useState(mergedPrefs.suspiciousLock);

  useEffect(() => {
    saveSecurityPrefs({
      twoFactorAuth,
      biometricAccess,
      loginAlerts,
      suspiciousLock,
    });
  }, [twoFactorAuth, biometricAccess, loginAlerts, suspiciousLock]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [pwStatus, setPwStatus] = useState("idle");
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [backupCodes, setBackupCodes] = useState(null);

  const strength = useMemo(() => passwordStrength(newPassword), [newPassword]);
  const strengthLabel = ["Too weak", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["bg-red-500", "bg-orange-500", "bg-amber-400", "bg-lime-500", "bg-green-500"][strength];

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    setPwStatus("updating");
    setTimeout(() => {
      setPwStatus("done");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPwStatus("idle"), 2500);
    }, 800);
  };

  const revokeSession = (id) => {
    setSessions((s) => s.filter((row) => row.id !== id));
  };

  const signOutEverywhere = () => {
    setSessions((s) => s.filter((row) => row.current));
  };

  const revealBackupCodes = () => {
    setBackupCodes(generateBackupCodes());
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black uppercase tracking-tight text-brand-900 dark:text-white">Security</h2>
        <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
          Sign-in methods, password, active sessions, and alerts for your advisor account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="space-y-8 xl:col-span-7">
          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">Authentication</h3>
              <span className="rounded-lg bg-green-50 px-3 py-1 text-[10px] font-black uppercase text-green-500 dark:bg-green-500/10">
                Strong protection
              </span>
            </div>
            <div className="space-y-6">
              <ToggleRow
                icon={<MdLock className="text-xl" />}
                title="Two-factor authentication"
                desc="Authenticator app or SMS when you sign in on a new device."
                on={twoFactorAuth}
                onToggle={() => setTwoFactorAuth(!twoFactorAuth)}
              />
              <ToggleRow
                icon={<MdFingerprint className="text-xl" />}
                title="Biometric access"
                desc="Touch ID or Face ID on supported devices after password."
                on={biometricAccess}
                onToggle={() => setBiometricAccess(!biometricAccess)}
              />
            </div>

            {twoFactorAuth && (
              <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/40 p-5 dark:border-brand-400/20 dark:bg-brand-400/5">
                <div className="mb-3 flex items-center gap-2">
                  <MdVpnKey className="text-lg text-brand-600 dark:text-cyan-400" />
                  <h4 className="text-xs font-black uppercase tracking-wide text-brand-900 dark:text-white">Backup & recovery</h4>
                </div>
                <p className="mb-4 text-[10px] font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                  If you lose your phone, backup codes let you sign in once. Store them like a password.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={revealBackupCodes}
                    className="rounded-xl bg-[#003366] px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-white shadow-md transition hover:bg-[#0a4a82]"
                  >
                    View backup codes
                  </button>
                  <button
                    type="button"
                    onClick={revealBackupCodes}
                    className="rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-[10px] font-black uppercase tracking-wide text-brand-900 transition hover:bg-gray-50 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700"
                  >
                    Regenerate codes
                  </button>
                </div>
                {backupCodes && backupCodes.length > 0 && (
                  <div className="mt-4 rounded-xl border border-brand-200 bg-white p-4 dark:border-navy-600 dark:bg-navy-900">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-brand-900 dark:text-white">
                      One-time backup codes
                    </p>
                    <p className="mb-3 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                      Each code works once. Store offline; connecting an API would invalidate old codes on regenerate.
                    </p>
                    <ol className="mb-4 grid max-h-40 grid-cols-2 gap-x-4 gap-y-1 overflow-y-auto font-mono text-[11px] font-semibold text-brand-900 dark:text-cyan-100 sm:grid-cols-2">
                      {backupCodes.map((code, idx) => (
                        <li key={`${code}-${idx}`}>{code}</li>
                      ))}
                    </ol>
                    <button
                      type="button"
                      onClick={() => setBackupCodes(null)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-[10px] font-black uppercase tracking-wide text-gray-600 transition hover:bg-gray-50 dark:border-navy-600 dark:text-gray-300 dark:hover:bg-navy-800"
                    >
                      Hide codes
                    </button>
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">Password</h3>
            <p className="mb-6 text-xs font-medium text-gray-500 dark:text-gray-400">
              Use a unique password you do not reuse on other sites. We will never ask for it by email.
            </p>

            <div className="space-y-4">
              <PasswordField
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                visible={show.current}
                onToggleVisibility={() => setShow((s) => ({ ...s, current: !s.current }))}
              />
              <PasswordField
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                visible={show.next}
                onToggleVisibility={() => setShow((s) => ({ ...s, next: !s.next }))}
              />
              {newPassword.length > 0 && (
                <div className="px-1">
                  <div className="mb-1 flex justify-between text-[10px] font-bold uppercase tracking-wide text-gray-400">
                    <span>Strength</span>
                    <span className="text-brand-700 dark:text-cyan-300">{strengthLabel}</span>
                  </div>
                  <div className="flex h-1.5 gap-1 overflow-hidden rounded-full bg-gray-200 dark:bg-navy-700">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 rounded-full transition-colors ${i < strength ? strengthColor : "bg-transparent"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              <PasswordField
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={show.confirm}
                onToggleVisibility={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
              />
              {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                <p className="flex items-center gap-1 text-[10px] font-semibold text-red-500">
                  <MdWarning className="shrink-0" /> Passwords do not match
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleChangePassword}
              disabled={
                pwStatus === "updating" ||
                !currentPassword ||
                !newPassword ||
                newPassword !== confirmPassword ||
                newPassword.length < 8 ||
                strength < 1
              }
              className="mt-6 w-full rounded-2xl bg-[#003366] py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-[#0a4a82] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
            >
              {pwStatus === "updating" ? "Updating…" : pwStatus === "done" ? "Password updated" : "Update password"}
            </button>
            {newPassword.length > 0 && (newPassword.length < 8 || strength < 1) && (
              <p className="mt-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                Use at least 8 characters and add numbers, capitals, or symbols to reach &quot;Weak&quot; or higher.
              </p>
            )}
          </Card>
        </div>

        <div className="space-y-8 xl:col-span-5">
          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <MdEmail className="text-xl text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-black uppercase tracking-tight text-brand-900 dark:text-white">Alerts</h3>
            </div>
            <div className="space-y-4">
              <ToggleRow
                icon={<MdShield className="text-xl" />}
                title="New sign-in alerts"
                desc="Email when a login happens from a new device or country."
                on={loginAlerts}
                onToggle={() => setLoginAlerts(!loginAlerts)}
              />
              <ToggleRow
                icon={<MdGppGood className="text-xl" />}
                title="Auto-lock on suspicious activity"
                desc="Require re-authentication after repeated failed attempts."
                on={suspiciousLock}
                onToggle={() => setSuspiciousLock(!suspiciousLock)}
              />
            </div>
          </Card>

          <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MdDevices className="text-xl text-brand-600 dark:text-brand-400" />
                <h3 className="text-sm font-black uppercase tracking-tight text-brand-900 dark:text-white">Active sessions</h3>
              </div>
              {sessions.length > 1 && (
                <button
                  type="button"
                  onClick={signOutEverywhere}
                  className="flex items-center gap-1 rounded-xl border border-red-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <MdLogout className="text-sm" />
                  Sign out others
                </button>
              )}
            </div>
            <p className="mb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
              Devices currently signed in to your account. Revoke access you do not recognize.
            </p>
            <ul className="space-y-3">
              {sessions.map((row) => (
                <li
                  key={row.id}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-navy-700 dark:bg-navy-900/50"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-brand-900 dark:text-white">{row.label}</p>
                      {row.current && (
                        <span className="rounded-md bg-green-500/15 px-2 py-0.5 text-[9px] font-black uppercase text-green-600 dark:text-green-400">
                          This device
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{row.detail}</p>
                  </div>
                  {!row.current && (
                    <button
                      type="button"
                      onClick={() => revokeSession(row.id)}
                      className="shrink-0 self-start rounded-xl border border-gray-200 px-3 py-2 text-[10px] font-black uppercase tracking-wide text-gray-600 transition hover:bg-white dark:border-navy-600 dark:text-gray-300 dark:hover:bg-navy-800"
                    >
                      Sign out
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

function ToggleRow({ icon, title, desc, on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-gray-50/50 p-4 text-left transition-all hover:border-brand-100 dark:bg-navy-900/50 dark:hover:border-white/5"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
            on ? "bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400" : "bg-gray-100 text-gray-400 dark:bg-navy-700"
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-black uppercase tracking-tighter text-brand-900 dark:text-white">{title}</h4>
          <p className="text-[10px] font-medium text-gray-400">{desc}</p>
        </div>
      </div>
      <div className={`h-6 w-11 shrink-0 rounded-full p-1 transition-colors duration-300 ${on ? "bg-brand-600 dark:bg-brand-400" : "bg-gray-200 dark:bg-navy-700"}`}>
        <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 ${on ? "translate-x-5" : "translate-x-0"}`} />
      </div>
    </button>
  );
}

function PasswordField({ label, value, onChange, visible, onToggleVisibility }) {
  return (
    <div>
      <label className="mb-2 block px-1 text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-3 pl-4 pr-12 text-sm font-bold text-brand-900 shadow-sm outline-none transition-all focus:border-brand-500/50 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:bg-gray-200/80 hover:text-brand-700 dark:hover:bg-navy-700 dark:hover:text-white"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
        </button>
      </div>
    </div>
  );
}

export default SecuritySettings;
