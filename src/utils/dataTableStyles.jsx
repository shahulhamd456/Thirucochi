/** Shared layout for admin data tables: rounded row hover + aligned padding */
export const DT_WRAP = "-mx-1 overflow-x-auto px-1";
export const DT_TABLE = "w-full border-separate border-spacing-x-0 border-spacing-y-1.5 text-left";
export const DT_TH = "px-4 pb-4 pt-0 text-[10px] font-black uppercase tracking-[2px] text-gray-400";

const TD_BASE =
  "px-4 py-4 transition-all duration-300 ease-out group-hover:bg-gray-50/90 dark:group-hover:bg-white/[0.06]";

/** Body cells (middle columns). */
export const TD = `${TD_BASE} align-middle`;
/** First column in a row — left rounded cap on hover. */
export const TD_1 = `${TD_BASE} align-middle group-hover:first:rounded-l-2xl`;
/** Last column — right rounded cap on hover. */
export const TD_END = `${TD_BASE} align-middle group-hover:last:rounded-r-2xl`;
/** Last column, right-aligned (e.g. actions). */
export const TD_END_R = `${TD_BASE} align-middle text-right group-hover:last:rounded-r-2xl`;
/** First column top-aligned (multi-line). */
export const TD_1_TOP = `${TD_BASE} align-top group-hover:first:rounded-l-2xl`;
/** Last column top-aligned. */
export const TD_END_TOP = `${TD_BASE} align-top group-hover:last:rounded-r-2xl`;
