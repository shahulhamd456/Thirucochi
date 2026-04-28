import React from "react";

const isDataImageUrl = (v) => typeof v === "string" && v.startsWith("data:image");

function formatFileSize(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return "";
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function formatFromFileName(name) {
  const ext = (name || "").split(".").pop()?.toLowerCase();
  const map = { pdf: "PDF", xlsx: "XLSX", xls: "XLS", csv: "CSV", doc: "DOC", docx: "DOCX" };
  return map[ext] || (ext ? ext.toUpperCase() : "PDF");
}

const CrudModal = ({ open, title, fields, values, onChange, onClose, onSubmit }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-navy-800 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-brand-900 dark:text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {fields.map((field) => {
            if (field.fileUpload) {
              const fileVal = values[field.key] ?? "";
              const nameVal = values[field.fileNameKey || "fileName"] ?? "";
              const maxMb = field.maxFileMb ?? 15;
              const maxBytes = maxMb * 1024 * 1024;
              const accept = field.accept || ".pdf,.xlsx,.xls,.csv,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

              return (
                <div key={field.key} className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400">{field.label}</label>
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/80 p-4 dark:border-white/15 dark:bg-navy-900/50">
                    <p className="mb-2 text-[11px] font-medium text-gray-500 dark:text-gray-400">
                      {field.hint || `Upload a report file (max ${maxMb} MB — PDF, Excel, CSV)`}
                    </p>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#003366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0a4a82]">
                      <input
                        type="file"
                        accept={accept}
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > maxBytes) {
                            window.alert(`Please choose a file under ${maxMb} MB.`);
                            e.target.value = "";
                            return;
                          }
                          const fnameKey = field.fileNameKey || "fileName";
                          onChange(fnameKey, file.name);
                          onChange("size", formatFileSize(file.size));
                          onChange("format", formatFromFileName(file.name));
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === "string") {
                              onChange(field.key, reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                          e.target.value = "";
                        }}
                      />
                      Choose file
                    </label>
                    {typeof fileVal === "string" && fileVal.startsWith("data:") && (
                      <p className="mt-3 text-[11px] font-medium text-green-600 dark:text-green-400">
                        Attached: <span className="font-semibold">{nameVal || "report"}</span> — stored in-browser until you connect a backend.
                      </p>
                    )}
                    {typeof fileVal === "string" && fileVal.startsWith("data:") && (
                      <button
                        type="button"
                        onClick={() => {
                          onChange(field.key, "");
                          onChange(field.fileNameKey || "fileName", "");
                        }}
                        className="mt-2 text-left text-xs font-semibold text-red-600 hover:underline dark:text-red-400"
                      >
                        Remove file
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            if (field.imageUpload) {
              const photoVal = values[field.key] ?? "";
              const maxMb = field.maxFileMb ?? 2;
              const maxBytes = maxMb * 1024 * 1024;

              return (
                <div key={field.key} className="md:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {field.label}
                  </label>

                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/80 p-4 dark:border-white/15 dark:bg-navy-900/50">
                    <p className="mb-2 text-[11px] font-medium text-gray-500 dark:text-gray-400">
                      Upload a photo from your device (max {maxMb} MB — JPG, PNG, WebP, GIF)
                    </p>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#003366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0a4a82]">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > maxBytes) {
                            window.alert(`Please choose an image under ${maxMb} MB.`);
                            e.target.value = "";
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === "string") {
                              onChange(field.key, reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                          e.target.value = "";
                        }}
                      />
                      Choose file
                    </label>
                    {isDataImageUrl(photoVal) && (
                      <p className="mt-2 text-[11px] font-medium text-green-600 dark:text-green-400">
                        Using uploaded image. Paste a URL below to replace it, or choose another file.
                      </p>
                    )}
                  </div>

                  <label className="mb-1 mt-4 block text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Or paste image URL
                  </label>
                  <input
                    type="url"
                    value={isDataImageUrl(photoVal) ? "" : photoVal}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    placeholder={field.placeholder || "https://…"}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-900 dark:text-white"
                  />

                  {(photoVal.startsWith("http") || isDataImageUrl(photoVal)) && (
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <img
                        src={photoVal.trim()}
                        alt=""
                        className="h-20 w-20 rounded-xl border border-gray-200 object-cover dark:border-white/10"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-medium text-gray-400">Preview</span>
                        <button
                          type="button"
                          onClick={() => onChange(field.key, "")}
                          className="text-left text-xs font-semibold text-red-600 hover:underline dark:text-red-400"
                        >
                          Remove photo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={field.key} className={field.full ? "md:col-span-2" : ""}>
                <label className="mb-1 block text-xs font-semibold text-gray-500">{field.label}</label>
                <input
                  type={field.inputType || "text"}
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-900 dark:text-white"
                />
                {field.previewAvatar &&
                  typeof values[field.key] === "string" &&
                  (values[field.key].trim().startsWith("http") || isDataImageUrl(values[field.key])) && (
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        src={values[field.key].trim()}
                        alt=""
                        className="h-16 w-16 rounded-xl border border-gray-200 object-cover dark:border-white/10"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <span className="text-[10px] text-gray-400">Preview</span>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium dark:border-white/10 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-lg bg-[#003366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0a4a82]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrudModal;
