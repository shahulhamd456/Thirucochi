import { apiGet, apiPut } from "api/client";
import { API } from "api/endpoints";
import { isLiveDynamicData } from "config/dataMode";

const STORAGE_KEY = "finance-crm-notifications";

const seedNotifications = [
  {
    id: "n1",
    initial: "ES",
    name: "Emma Smith",
    title: "Need to update the details.",
    desc: "Customer profile pending review.",
    time: "7 hr ago",
    type: "info",
    read: false,
  },
  {
    id: "n2",
    initial: "DT",
    name: "Design Team",
    title: "Check your shared folder.",
    desc: "New assets uploaded for review.",
    time: "6 hr ago",
    type: "info",
    read: false,
  },
  {
    id: "n3",
    initial: "SU",
    name: "Security update",
    title: "Password successfully set.",
    desc: "Your account security was updated.",
    time: "5 hr ago",
    type: "success",
    read: true,
  },
  {
    id: "n4",
    initial: "IN",
    name: "Invoice #1432",
    title: "Payment received",
    desc: "Amount: Rs 89,900 credited.",
    time: "5 hr ago",
    type: "success",
    read: false,
  },
  {
    id: "n5",
    initial: "OC",
    name: "Olivia Clark",
    title: "Report available",
    desc: "You can now view the quarterly report.",
    time: "4 hr ago",
    type: "info",
    read: true,
  },
  {
    id: "n6",
    initial: "IW",
    name: "Isabella Walker",
    title: "Mentioned you",
    desc: "@advisor please review the proposal.",
    time: "2 hr ago",
    type: "warning",
    read: false,
  },
];

const normalize = (n) => ({
  ...n,
  name: n.name || n.title,
  title: n.title || n.name,
  desc: n.desc || "",
  initial:
    n.initial ||
    (typeof n.name === "string" && n.name.length >= 2
      ? n.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "NT"),
});

function readLocalNotifications() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNotifications));
    return seedNotifications.map(normalize);
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedNotifications.map(normalize);
    return parsed.map(normalize);
  } catch {
    return seedNotifications.map(normalize);
  }
}

function writeLocalNotifications(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** Load notifications: API when live, else localStorage + seed. */
export async function loadNotifications() {
  if (isLiveDynamicData) {
    try {
      const json = await apiGet(API.notifications);
      if (Array.isArray(json)) return json.map(normalize);
    } catch {
      /* empty when backend unavailable in production */
    }
    return [];
  }
  return readLocalNotifications();
}

/** Persist full list after user actions (e.g. mark all read). */
export async function persistNotificationsList(list) {
  const normalized = list.map(normalize);
  if (isLiveDynamicData) {
    try {
      await apiPut(API.notifications, normalized);
    } catch {
      /* ignore; UI already updated optimistically if you choose that pattern */
    }
    return;
  }
  writeLocalNotifications(normalized);
}

/** @deprecated Prefer loadNotifications() — sync API only for local demo code. */
export const getNotifications = () => readLocalNotifications();

/** @deprecated Prefer persistNotificationsList — local only. */
export const setNotifications = (list) => {
  writeLocalNotifications(list);
};

export const markAllNotificationsRead = () => {
  const next = readLocalNotifications().map((n) => ({ ...n, read: true }));
  writeLocalNotifications(next);
  return next;
};

export async function markAllNotificationsReadAsync() {
  const current = await loadNotifications();
  const next = current.map((n) => ({ ...n, read: true }));
  await persistNotificationsList(next);
  return next;
}
