/**
 * When true, dynamic domain data must come from the API (no local JSON merge / no localStorage for that data).
 * Production builds are always "live"; in development set REACT_APP_USE_BACKEND_DATA=true to match production.
 */
export const isLiveDynamicData =
  process.env.NODE_ENV === "production" || process.env.REACT_APP_USE_BACKEND_DATA === "true";

/** In development without the flag, mock/local fallbacks are allowed for faster UI work. */
export const allowLocalDynamicFallback = !isLiveDynamicData;
