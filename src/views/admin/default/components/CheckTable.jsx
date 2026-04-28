import React from "react";
import CardMenu from "components/card/CardMenu";
import Checkbox from "components/checkbox";
import Card from "components/card";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function CheckTable(props) {
  const { tableData } = props;
  const scrollRef = React.useRef(null);
  const [sorting, setSorting] = React.useState([]);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <Checkbox
            defaultChecked={info.getValue()[1]}
            className="me-[10px]"
          />
          <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()[0]}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("progress", {
      id: "progress",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PROGRESS
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("quantity", {
      id: "quantity",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          QUANTITY
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const scrollTableToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollTableToBottom = () => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Check Table
        </div>

        <CardMenu />
      </header>

      <div
        ref={scrollRef}
        className="mt-8 max-h-[39rem] overflow-y-auto overflow-x-auto xl:overflow-x-hidden"
      >
        <table className="w-full border-separate border-spacing-x-0 border-spacing-y-1.5">
          <thead className="sticky top-0 z-[1] bg-white dark:!bg-navy-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 bg-white px-4 pb-2 pt-4 text-start dark:border-white/10 dark:!bg-navy-800"
                    >
                      <div className="flex items-center justify-between text-xs">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.map((row) => {
                return (
                  <tr key={row.id} className="group">
                    {row.getVisibleCells().map((cell, ci, cells) => {
                      const isFirst = ci === 0;
                      const isLast = ci === cells.length - 1;
                      return (
                        <td
                          key={cell.id}
                          className={`min-w-[150px] border-white/0 px-4 py-3 transition-all duration-300 ease-out group-hover:bg-gray-50/90 dark:group-hover:bg-white/[0.06] ${isFirst ? "group-hover:first:rounded-l-2xl" : ""} ${isLast ? "group-hover:last:rounded-r-2xl" : ""}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-stretch gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-center text-sm font-bold text-navy-700 dark:text-white sm:text-start">
          Scroll the table
        </p>
        <div className="flex justify-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={scrollTableToTop}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-navy-700 shadow-sm transition hover:bg-gray-50 dark:border-white/20 dark:bg-navy-700 dark:text-white dark:hover:bg-white/10"
          >
            <MdKeyboardArrowUp className="h-5 w-5 shrink-0 text-brand-500 dark:text-brand-400" />
            Top
          </button>
          <button
            type="button"
            onClick={scrollTableToBottom}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-navy-700 shadow-sm transition hover:bg-gray-50 dark:border-white/20 dark:bg-navy-700 dark:text-white dark:hover:bg-white/10"
          >
            <MdKeyboardArrowDown className="h-5 w-5 shrink-0 text-brand-500 dark:text-brand-400" />
            Bottom
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CheckTable;
const columnHelper = createColumnHelper();
