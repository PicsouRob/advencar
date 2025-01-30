"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Customer } from "@prisma/client";
import ConfirmModal from "@/components/common/ConfirmModal";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import CustomerSheet from "./CustomerSheet";
import { handleDeleteAction } from "@/utils/handleFetchAction";
import { toast } from "@/hooks/use-toast";

export const customersColumns: ColumnDef<Customer>[] = [
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
        accessorKey: "documentId",
        header: "Documento"
    },
    {
        accessorKey: "creditCard",
        header: "Tarjeta de Crédito"
    },
    {
        accessorKey: "creditLimit",
        header: "Limite de Crédito"
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
        accessorKey: "personType",
        header: "Tipo de Persona"
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <CustomerSheet client={row.original} updateClient={true}>
                        <Button variant="ghost" size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                        >
                            <TooltipWrapper
                                text="Editar Cliente"
                            >
                                <Edit className="size-4" />
                            </TooltipWrapper>
                        </Button>
                    </CustomerSheet>

                    <ConfirmModal
                        title="Eliminar Cliente"
                        description="¿Estás seguro de que deseas eliminar este cliente?"
                        onConfirm={async () => {
                            await handleDeleteAction(`/api/customer/delete?id=${row.original.id}`,
                                (isCompleted, message) => {
                                    if (isCompleted) {
                                        toast({
                                            title: "Eliminar Cliente",
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
                            text="Eliminar Cliente"
                        >
                            <Trash className="size-4" />
                        </TooltipWrapper>
                    </Button>
                    </ConfirmModal>
                </div>
            )
        }
    }
];
