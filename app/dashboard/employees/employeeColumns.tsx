/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import ConfirmModal from "@/components/common/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Employee } from "@prisma/client";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import EmployeeSheet from "./EmployeeSheet";
import { handleDeleteAction } from "@/utils/handleFetchAction";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "@/utils/date";

export const employeeColumns: ColumnDef<Employee>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost" className="hover:text-green-600 hover:bg-green-50"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre

                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "workShift",
        header: "Horario de Trabajo",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            return (
                <p
                    className={`text-center rounded px-1 ${row.original.status === "Activo" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
                >
                    {row.original.status}
                </p>
            )
        }
    },
    {
        accessorKey: "documentId",
        header: "Documento",
    },
    {
        accessorKey: "hireDate",
        header: "Fecha de Contratación",
        cell: ({ getValue }) => {
            const rawDate: any = getValue(); // Original Value

            return formatDate(rawDate);  // Format the date
        },
    },
    {
        accessorKey: "role",
        header: "Rol",
        cell: ({ getValue }) => {
            const rawRole: any = getValue(); 
            const value = rawRole === "ADMIN" ? "Admin" : "Asistente"; 

            return value;
        },
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <EmployeeSheet employee={row.original} updateEmployee={true}>
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        > 
                            <TooltipWrapper
                                text="Editar Empleado"
                            >
                                <Edit className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </EmployeeSheet>

                    <ConfirmModal
                        title="Eliminar Empleado"
                        description="¿Estás seguro de que deseas eliminar este empleado?"
                        onConfirm={async () => {
                            await handleDeleteAction(`/api/employee/delete?id=${row.original.id}`,
                                (isCompleted, message) => {
                                    if (isCompleted) {
                                        toast({
                                            title: "Eliminar Empleado",
                                            description: message,
                                        });
                                    } else {
                                        toast({
                                            title: "Error",
                                            description: message,
                                            variant: "destructive",
                                        });
                                    }
                                });
                        }}
                    >
                        <Button variant="ghost" size="sm"
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Eliminar Empleado"
                            >
                                <Trash className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </ConfirmModal>
                </div>
            );
        },
    },
];
