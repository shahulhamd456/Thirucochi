import { apiGet, apiPost } from "api/client";
import { API } from "api/endpoints";
import { isLiveDynamicData } from "config/dataMode";

const STORAGE_KEY = "finance-crm-recent-searches";
const MAX = 6;

function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocal(next) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

/** Load recent searches: API when live, else localStorage. */
export async function loadRecentSearches() {
  if (isLiveDynamicData) {
    try {
      const json = await apiGet(API.recentSearches);
      if (Array.isArray(json) && json.every((x) => typeof x === "string")) return json;
    } catch {
      /* fall through */
    }
    return [];
  }
  return readLocal();
}

/**
 * Record a search. Live: POST { query } — backend returns updated string[].
 * Local: merges in the browser.
 */
export async function addRecentSearchAsync(query) {
  const q = query?.trim();
  if (!q) return loadRecentSearches();

  if (isLiveDynamicData) {
    try {
      const json = await apiPost(API.recentSearches, { query: q });
      if (Array.isArray(json) && json.every((x) => typeof x === "string")) return json;
    } catch {
      return loadRecentSearches();
    }
    return loadRecentSearches();
  }

  const prev = readLocal().filter((s) => s.toLowerCase() !== q.toLowerCase());
  const next = [q, ...prev].slice(0, MAX);
  writeLocal(next);
  return next;
}

/** @deprecated Use loadRecentSearches — local only. */
export const getRecentSearches = () => readLocal();

/** @deprecated Use addRecentSearchAsync — local only. */
export const addRecentSearch = (query) => {
  const q = query?.trim();
  if (!q) return getRecentSearches();
  const prev = getRecentSearches().filter((s) => s.toLowerCase() !== q.toLowerCase());
  const next = [q, ...prev].slice(0, MAX);
  writeLocal(next);
  return next;
};
