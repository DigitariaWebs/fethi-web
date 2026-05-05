"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type DataTableProps<T> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  initialSorting?: SortingState;
  pageSize?: number;
  globalFilter?: string;
  onRowClick?: (row: T) => void;
  getRowId?: (row: T) => string;
  empty?: React.ReactNode;
  density?: "compact" | "regular";
  stickyHeader?: boolean;
};

export function DataTable<T>({
  columns,
  data,
  initialSorting,
  pageSize = 25,
  globalFilter,
  onRowClick,
  getRowId,
  empty,
  density = "regular",
  stickyHeader,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting ?? []);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
  });

  const cellPad = density === "compact" ? "px-3 py-2" : "px-4 py-3";

  const totalRows = table.getFilteredRowModel().rows.length;
  const start = pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(start + pagination.pageSize - 1, totalRows);

  return (
    <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
      <div className="overflow-auto">
        <table className="w-full text-body-sm">
          <thead className={cn(stickyHeader && "sticky top-0 z-10")}>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-n-100 bg-paper">
                {hg.headers.map((h) => {
                  const canSort = h.column.getCanSort();
                  const sort = h.column.getIsSorted();
                  return (
                    <th
                      key={h.id}
                      className={cn(
                        "text-label text-n-500 font-medium tracking-wide uppercase text-left",
                        cellPad,
                        canSort && "cursor-pointer select-none hover:text-n-700",
                      )}
                      style={{ width: h.getSize() ? h.getSize() : undefined }}
                      onClick={canSort ? h.column.getToggleSortingHandler() : undefined}
                    >
                      <span className="inline-flex items-center gap-1">
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {canSort ? (
                          sort === "asc" ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : sort === "desc" ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ArrowUpDown className="h-3 w-3 opacity-40" />
                          )
                        ) : null}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-n-500">
                  {empty ?? "Aucune entrée"}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  className={cn(
                    "border-b border-n-100 last:border-0 transition-colors",
                    onRowClick && "cursor-pointer hover:bg-n-50",
                    i % 2 === 1 && !onRowClick && "bg-paper/40",
                  )}
                >
                  {row.getVisibleCells().map((c) => (
                    <td key={c.id} className={cn("text-ink align-middle", cellPad)}>
                      {flexRender(c.column.columnDef.cell, c.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalRows > 0 ? (
        <div className="flex items-center justify-between border-t border-n-100 bg-paper px-4 py-2.5 text-caption text-n-500">
          <span className="tabular">
            {start}–{end} sur {totalRows}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-n-100 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-n-100 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
