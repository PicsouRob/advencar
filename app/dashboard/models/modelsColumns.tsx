"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";

import { Model } from "@prisma/client";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/common/ConfirmModal";
import ModelModal from "./ModelModal";
import { handleDeleteAction } from "@/utils/handleFetchAction";
import { toast } from "@/hooks/use-toast";

export const modelsColumns: ColumnDef<Model>[] = [
    {
        accessorKey: "id",
        header: "Identificación",
    },
    {
        accessorKey: "brand.description",
        header: "Marca",
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
                    <ModelModal model={row.original} updateModel={true}>
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Editar Modelo"
                            >
                                <Edit className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </ModelModal>

                    <ConfirmModal
                        title="Eliminar Modelo"
                        description="¿Estás seguro de que deseas eliminar este modelo?"
                        onConfirm={async () => {
                            await handleDeleteAction(`/api/model/delete?id=${row.original.id}`,
                                (isCompleted, message) => {
                                    if (isCompleted) {
                                        toast({
                                            title: "Eliminar Modelo",
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
