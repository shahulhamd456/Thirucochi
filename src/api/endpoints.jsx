/**
 * Canonical API paths for live data (production or REACT_APP_USE_BACKEND_DATA=true).
 *
 * dashboardStats: GET → array of { title, value, trend, trendUp, sub }
 * dashboardTableCheck: GET → same shape as tableDataCheck.json
 * dashboardTableComplex: GET → same shape as tableDataComplex.json
 * notifications: GET → array of notification objects; PUT → replace full list (body = array)
 * recentSearches: GET → string[]; POST body { query: string } → string[] (updated list)
 */
export const API = {
  dashboardStats: "/api/dashboard/stats",
  dashboardTableCheck: "/api/dashboard/tables/check",
  dashboardTableComplex: "/api/dashboard/tables/complex",
  notifications: "/api/notifications",
  recentSearches: "/api/search/recent",
};
