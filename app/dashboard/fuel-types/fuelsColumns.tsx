"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";

import { FuelType } from "@prisma/client";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/common/ConfirmModal";
import FuelTypeModal from "./FuelType";
import { handleDeleteAction } from "@/utils/handleFetchAction";

export const fuelsColumns: ColumnDef<FuelType>[] = [
    {
        accessorKey: "id",
        header: "Identificación",
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost" className="hover:text-green-600 hover:bg-green-50"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Descripción

                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            return (
                <p
                    className={`text-center max-w-min rounded px-3 ${row.original.status === "Activo" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
                >
                    {row.original.status}
                </p>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <FuelTypeModal fuelType={row.original} updateFuelType={true}>
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        > 
                            <TooltipWrapper
                                text="Editar Modelo"
                            >
                                <Edit className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </FuelTypeModal>

                    <ConfirmModal
                        title="Eliminar Modelo"
                        description="¿Estás seguro de que deseas eliminar este modelo?"
                        onConfirm={async () => {
                            await handleDeleteAction(
                                `/api/fuel-type/delete?id=${row.original.id}`,
                                (isCompleted, message) => {
                                    if (isCompleted) {
                                        alert(message);

                                        window.location.reload();
                                    } else {
                                        alert(message);
                                    }
                                });
                        }}
                    >
                        <Button variant="ghost" size="sm"
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Eliminar Modelo"
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
