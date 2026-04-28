import React, { useState, useEffect, useMemo } from "react";
import Card from "components/card";
import { MdEmail, MdPhoneAndroid, MdSms, MdCampaign } from "react-icons/md";

const NOTIFICATION_PREFS_KEY = "finance-crm-notification-prefs";

function loadNotificationPrefs() {
  try {
    const raw = localStorage.getItem(NOTIFICATION_PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveNotificationPrefs(prefs) {
  try {
    localStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

const Row = ({ icon, title, desc, on, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-gray-50/50 p-4 text-left transition-all hover:border-brand-100 dark:bg-navy-900/50 dark:hover:border-white/5"
  >
    <div className="flex min-w-0 items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
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

const NotificationSettings = () => {
  const initial = useMemo(() => {
    const s = loadNotificationPrefs();
    return {
      emailDigest: s.emailDigest !== false,
      pushAlerts: s.pushAlerts !== false,
      smsCritical: Boolean(s.smsCritical),
      marketing: Boolean(s.marketing),
    };
  }, []);

  const [emailDigest, setEmailDigest] = useState(initial.emailDigest);
  const [pushAlerts, setPushAlerts] = useState(initial.pushAlerts);
  const [smsCritical, setSmsCritical] = useState(initial.smsCritical);
  const [marketing, setMarketing] = useState(initial.marketing);

  useEffect(() => {
    saveNotificationPrefs({
      emailDigest,
      pushAlerts,
      smsCritical,
      marketing,
    });
  }, [emailDigest, pushAlerts, smsCritical, marketing]);

  return (
    <div className="space-y-8">
      <Card extra="rounded-[32px] border border-gray-100 bg-white p-6 shadow-2xl shadow-brand-500/5 dark:border-white/5 dark:bg-navy-800 sm:p-8">
        <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-brand-900 dark:text-white">Channels</h3>
        <p className="mb-8 text-xs font-medium text-gray-500 dark:text-gray-400">
          Choose how we reach you. Critical compliance notices may still be sent by email when required.
        </p>
        <div className="space-y-4">
          <Row
            icon={<MdEmail className="text-xl" />}
            title="Daily email digest"
            desc="Summary of leads, maturities, and tasks each morning."
            on={emailDigest}
            onToggle={() => setEmailDigest(!emailDigest)}
          />
          <Row
            icon={<MdPhoneAndroid className="text-xl" />}
            title="Push notifications"
            desc="Browser or app alerts for real-time events."
            on={pushAlerts}
            onToggle={() => setPushAlerts(!pushAlerts)}
          />
          <Row
            icon={<MdSms className="text-xl" />}
            title="SMS for critical alerts"
            desc="High-priority renewals and failed payments only."
            on={smsCritical}
            onToggle={() => setSmsCritical(!smsCritical)}
          />
          <Row
            icon={<MdCampaign className="text-xl" />}
            title="Product & training updates"
            desc="Occasional messages from Finance CRM."
            on={marketing}
            onToggle={() => setMarketing(!marketing)}
          />
        </div>
      </Card>
    </div>
  );
};

export default NotificationSettings;
