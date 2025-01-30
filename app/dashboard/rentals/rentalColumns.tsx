"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/common/ConfirmModal";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { Rent } from "@prisma/client";
import RentSheet from "./RentSheet";
import { handleDeleteAction } from "@/utils/handleFetchAction";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "@/utils/date";

export const rentalColumns: ColumnDef<Rent>[] = [
    {
        accessorKey: "vehicle.description",
        header: "Vehículo",
    },
    {
        accessorKey: "customer.name",
        header: "Cliente",
    },
    {
        accessorKey: "returnDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost" className="hover:text-green-600 hover:bg-green-50"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha de retorno

                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ getValue }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rawDate: any = getValue(); // Original Value

            return formatDate(rawDate);  // Format the date
        },
    },
    {
        accessorKey: "dailyRate",
        header: "Tarifa Diaria",
    },
    {
        accessorKey: "days",
        header: "Días",
    },
    {
        accessorKey: "comments",
        header: "Comentarios",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            return (
                <p
                    className={`text-center rounded px-1 ${row.original.status === "Finalizado" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
                >
                    {row.original.status}
                </p>
            )
        }
    },
    {
        accessorKey: "employee.name",
        header: "Empleado",
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <RentSheet rent={row.original} updateRent={true}>
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Editar Alquiler"
                            >
                                <Edit className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </RentSheet>

                    <ConfirmModal
                        title="Eliminar Alquiler"
                        description="¿Estás seguro de que deseas eliminar este alquiler?"
                        onConfirm={async () => {
                            await handleDeleteAction(`/api/rent/delete?id=${row.original.id}`,
                                (isCompleted, message) => {
                                    if (isCompleted) {
                                        toast({
                                            title: "Eliminar Alquiler",
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
                        <div
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white py-2 px-3 rounded cursor-pointer app-transition"
                        >
                            <TooltipWrapper
                                text="Eliminar Alquiler"
                            >
                                <Trash className="size-4" />
                            </TooltipWrapper>
                        </div>
                    </ConfirmModal>
                </div>
            );
        },
    },
];
