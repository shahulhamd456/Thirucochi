export const filterRowsByQuery = (rows, query, keys) => {
  if (!query?.trim()) return rows;
  const q = query.toLowerCase().trim();
  return rows.filter((row) =>
    keys.some((key) => String(row[key] ?? "").toLowerCase().includes(q))
  );
};

export const exportRowsToCsv = (rows, columns, filename = "export.csv") => {
  const header = columns.map((col) => col.label).join(",");
  const csvRows = rows.map((row) =>
    columns
      .map((col) => {
        const raw = String(row[col.key] ?? "");
        const escaped = raw.replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(",")
  );

  const csv = [header, ...csvRows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
