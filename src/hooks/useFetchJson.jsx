import { useState, useEffect, useRef } from "react";
import { apiGet } from "api/client";
import { allowLocalDynamicFallback } from "config/dataMode";

/**
 * GET JSON on mount. With allowLocalDynamicFallback (dev), merges API rows into initialData.
 * When live (production or REACT_APP_USE_BACKEND_DATA), the response replaces initialData; errors yield [] for arrays.
 */
export function useFetchJson(path, initialData) {
  const initialRef = useRef(initialData);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    initialRef.current = initialData;
  }, [initialData]);

  useEffect(() => {
    if (!path) return;
    let cancelled = false;

    apiGet(path)
      .then((json) => {
        if (cancelled || json == null) return;
        const base = initialRef.current;

        if (Array.isArray(json)) {
          if (allowLocalDynamicFallback && Array.isArray(base) && json.length > 0) {
            setData(base.map((row, i) => ({ ...row, ...(json[i] || {}) })));
          } else {
            setData(json);
          }
          return;
        }

        if (typeof json === "object" && typeof base === "object" && base !== null && !Array.isArray(base)) {
          if (allowLocalDynamicFallback) {
            setData({ ...base, ...json });
          } else {
            setData(json);
          }
        }
      })
      .catch(() => {
        if (cancelled) return;
        if (!allowLocalDynamicFallback) {
          const base = initialRef.current;
          setData(Array.isArray(base) ? [] : {});
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return data;
}
