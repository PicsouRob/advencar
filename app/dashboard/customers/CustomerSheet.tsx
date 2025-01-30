"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormLabel,
    FormMessage
} from "@/components/ui/form";
import { ClientFormSchema, clientFormSchema } from "@/utils/form/client";
import { Input } from "@/components/ui/input";
import SheetWrapper from "@/components/common/SheetWrapper";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "@/components/ui/select";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Customer } from "@prisma/client";
import { handleFetchAction } from "@/utils/handleFetchAction";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CustomerSheetProps {
    client?: Customer;
    updateClient?: boolean;
    children?: React.ReactNode;
}

const CustomerSheet: React.FC<CustomerSheetProps> = ({
    client, updateClient, children
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const form = useForm<ClientFormSchema>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            name: "", documentId: "", creditCard: "",
            creditLimit: 0, personType: "Física", status: "Activo"
        },
    });

    useEffect(() => {
        if (updateClient) {
            form.setValue("id", client!.id);
            form.setValue("name", client!.name);
            form.setValue("documentId", client!.documentId);
            form.setValue("creditCard", client!.creditCard);
            form.setValue("creditLimit", client!.creditLimit);
            form.setValue("personType", client!.personType);
            form.setValue("status", client!.status);
        }
    }, [form, updateClient, client]);

    const onSubmit = async (values: ClientFormSchema) => {
        setError("");

        const fetchMethod = updateClient ? "PUT" : "POST";
        const url = updateClient ? `/api/customer/update` : `/api/customer/create`;

        await handleFetchAction(
            values, fetchMethod, url, (isCompleted, message) => {
                if (isCompleted) {
                    setIsOpen(false);
                    router.refresh();

                    toast({
                        title: "Gestion de Cliente",
                        description: message,
                    });
                } else {
                    setError(message);
                }
            }
        );
    }

    return (
        <SheetWrapper
            isOpen={isOpen} setOpen={setIsOpen}
            title={updateClient ? "Editar Cliente" : "Añadir Cliente"}
            description={updateClient ? `LLena el formulario para editar el cliente ${client?.name}`
                : "LLena el formulario para añadir un nuevo cliente a la lista."
            }
            trigger={updateClient ? children : <Button className="">Añadir Cliente</Button>}
        >
            <div className="h-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-3 flex-col h-full pb-[10rem]">
                        {error && <ErrorMessage error={error} />}
                        
                        <div className="space-y-5 overflow-auto">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: Juan Perez" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="documentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Documento <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: 123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="creditCard"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Tarjeta de Crédito <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="ex: 1234567890123456" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="creditLimit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Limite de Crédito <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="ex: 1000"
                                                {...field}
                                                value={field.value ? Number(field.value) : 0}
                                                onChange={(event) => field.onChange(Number(event.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="personType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Persona <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de persona" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Física">Física</SelectItem>
                                                    <SelectItem value="Jurídica">Jurídica</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Activo">Activo</SelectItem>
                                                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
                            <SheetFooter className="grid grid-cols-2 gap-2">
                                <SheetClose className="border px-4 rounded hover:bg-gray-100">Cancelar</SheetClose>

                                <Button disabled={form.formState.isSubmitting} className="" type="submit">
                                    {form.formState.isSubmitting && <div className="size-4 rounded-full border-y border-l animate-spin" />}

                                    <span className="">{
                                        form.formState.isSubmitting ? "Guardando..." : "Guardar"
                                    }</span>
                                </Button>
                            </SheetFooter>
                        </div>
                    </form>
                </Form>
            </div>
        </SheetWrapper>
    );
}

export default CustomerSheet;