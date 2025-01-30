"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Trash } from "lucide-react";

import { Inspection } from "@prisma/client";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/common/ConfirmModal";
import InspectionSheet from "./InspectionSheet";
import InspectionDetailSheet from "./InspectionDetailSheet";
import { handleDeleteAction } from "@/utils/handleFetchAction";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "@/utils/date";

export const inspectionColumns: ColumnDef<Inspection>[] = [
    // {
    //     accessorKey: "transactionId",
    //     header: "Número de Transacción",
    // },
    {
        accessorKey: "vehicle.description",
        header: "Vehículo",
    },
    {
        accessorKey: "customer.name",
        header: "Cliente",
    },
    {
        accessorKey: "tireStatus",
        header: "Info de Llantas",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            return (
                <p
                    className={`text-center rounded px-1 ${row.original.status === "Completado" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
                >
                    {row.original.status}
                </p>
            )
        }
    },
    {
        accessorKey: "inspectionDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost" className="hover:text-green-600 hover:bg-green-50"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha de inspección

                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ getValue }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rawDate: any = getValue(); // Original Value

            return formatDate(rawDate);   // Format the date
        },
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <InspectionDetailSheet inspection={row.original}>
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Ver Detalles"
                            >
                                <Eye className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </InspectionDetailSheet>
                    
                    <InspectionSheet inspection={row.original} updateInspection={true}>
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Editar Inspection"
                            >
                                <Edit className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </InspectionSheet>

                    <ConfirmModal
                        title="Eliminar Inspection"
                        description="¿Estás seguro de que deseas eliminar esta inspection?"
                        onConfirm={async () => {
                            await handleDeleteAction(`/api/inspection/delete?id=${row.original.id}`,
                                (isCompleted, message) => {
                                    if (isCompleted) {
                                        toast({
                                            title: "Eliminar Inspection",
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
                                text="Eliminar Inspection"
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
