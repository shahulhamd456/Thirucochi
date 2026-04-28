/**
 * Backend calls — keep paths relative (e.g. "/api/...") when using CRA "proxy"
 * in package.json, or set REACT_APP_API_URL (e.g. http://localhost:3001).
 */

function baseUrl() {
  const b = process.env.REACT_APP_API_URL;
  return b ? String(b).replace(/\/$/, "") : "";
}

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = baseUrl();
  return base ? `${base}${p}` : p;
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }

  const ct = res.headers.get("content-type");
  if (ct && ct.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

export function apiGet(path) {
  return apiFetch(path, { method: "GET" });
}

export function apiPost(path, body) {
  return apiFetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function apiPut(path, body) {
  return apiFetch(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function apiDelete(path) {
  return apiFetch(path, { method: "DELETE" });
}
