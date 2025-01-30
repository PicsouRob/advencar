"use client";

import { useState } from "react";
import {
    ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel,
    getFilteredRowModel, getPaginationRowModel,
    getSortedRowModel, SortingState, useReactTable, VisibilityState
} from "@tanstack/react-table";

import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from "./table";
import { Button } from "./button";
import { Input } from "./input";
import {
    DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
    DropdownMenuTrigger
} from "./dropdown-menu";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchBy: string;
    hint: string; // search by hint
}

export function DataTable<TData, TValue>({
    columns, data, searchBy, hint
}: DataTableProps<TData, TValue>) { 
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting, columnFilters, columnVisibility,
        }
    });

    return (
        <div className="">
            <div className="flex items-center py-4">
                <Input
                    placeholder={`Buscar por ${hint}`}
                    value={(table.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        const value = event.target.value;
                        table.getColumn(searchBy)?.setFilterValue(value);

                        table.setGlobalFilter(value);
                    }}
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columnas
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        {table.getAllColumns().filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize" 
                                        checked={column.getIsVisible()}
                                        onCheckedChange={((value) => column.toggleVisibility(!!value))}
                                    >
                                        {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    )
                                })}

                                
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No se encontraron resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
};
