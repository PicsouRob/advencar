"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Trash } from "lucide-react";

import { Vehicle } from "@prisma/client";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/common/ConfirmModal";
import VehicleSheet from "./VehicleSheet";
import VehicleDetailSheet from "./VehicleDetailSheet";
import { handleDeleteAction } from "@/utils/handleFetchAction";
import { toast } from "@/hooks/use-toast";

export const vehiclesColumns: ColumnDef<Vehicle>[] = [
    {
        accessorKey: "plateNumber",
        header: "Número de Placa",
    },
    {
        accessorKey: "vehicleType.description",
        header: "Tipo de Vehículo",
    },
    {
        accessorKey: "brand.description",
        header: "Marca",
    },
    {
        accessorKey: "model.description",
        header: "Modelo",
    },
    {
        accessorKey: "description",
        header: "Descripción",
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost" className="hover:text-green-600 hover:bg-green-50"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Estado

                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p
                    className={`text-center max-w-max rounded px-4 ${row.original.status === "Disponible" ? "text-green-600 bg-green-50" : row.original.status === "Alquilado" ? "text-[#073b4c] bg-[#073b4c]/20" : "text-red-600 bg-red-50"}`}
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
                    <VehicleDetailSheet
                        vehicle={row.original}
                    >
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Ver Detalles"
                            >
                                <Eye className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </VehicleDetailSheet>

                    <VehicleSheet vehicle={row.original} updateVehicle={true}>
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Editar Vehiculo"
                            >
                                <Edit className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </VehicleSheet>

                    <ConfirmModal
                        title="Eliminar Vehiculo"
                        description="¿Estás seguro de que deseas eliminar este vehiculo?"
                        onConfirm={async () => {
                            await handleDeleteAction(`/api/vehicle/delete?id=${row.original.id}`,
                                (isCompleted, message) => {
                                    if (isCompleted) {
                                        toast({
                                            title: "Eliminar Vehiculo",
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
                                text="Eliminar Vehiculo"
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
