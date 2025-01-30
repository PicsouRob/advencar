"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, 
    FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, 
    SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import ModalWrapper from "@/components/common/ModalWrapper";
import { fuelTypeFormSchema, FuelTypeFormSchema } from "@/utils/form/fuel-type";
import ErrorMessage from "@/components/common/ErrorMessage";
import { FuelType } from "@prisma/client";
import { handleFetchAction } from "@/utils/handleFetchAction";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface FuelTypeModalProps {
    fuelType?: FuelType;
    updateFuelType?: boolean;
    children?: React.ReactNode;
}

const FuelTypeModal: React.FC<FuelTypeModalProps> = ({
    fuelType, updateFuelType, children
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const form = useForm<FuelTypeFormSchema>({
        resolver: zodResolver(fuelTypeFormSchema),
        defaultValues: {
            description: "", status: "Activo",
        },
    });

    useEffect(() => {
        if (updateFuelType) {
            form.setValue("id", fuelType!.id);
            form.setValue("description", fuelType!.description);
            form.setValue("status", fuelType!.status);
        }
    }, [form, updateFuelType, fuelType]);

    const onSubmit = async (values: FuelTypeFormSchema) => {
        setError("");

        const fetchMethod = updateFuelType ? "PUT" : "POST";
        const url = updateFuelType ? `/api/fuel-type/update` : `/api/fuel-type/create`;

        await handleFetchAction(
            values, fetchMethod, url, (isCompleted, message) => {
                if (isCompleted) {
                    setIsOpen(false);
                    router.refresh();

                    toast({
                        title: "Gestion de Tipo de Combustible",
                        description: message,
                    });
                } else {
                    setError(message);
                }
            }
        );
    }

    return (
        <ModalWrapper
            open={isOpen} setOpen={setIsOpen}
            title={updateFuelType ? "Editar Tipo de Combustible" : "Añadir Tipo de Combustible"}
            description={updateFuelType ? `LLena el formulario para editar el tipo de combustible ${fuelType?.description}`
                : "LLena el formulario para añadir un nuevo tipo de combustible a la lista."
            }
            trigger={updateFuelType ? children : <Button className="">Añadir Tipo de Combustible</Button>}
        >
            <div className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 h-full">
                        <div className="space-y-5">
                            {error && <ErrorMessage error={error} />}

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="ex: Mercedes Benz" {...field} />
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

                        <SheetFooter className="grid grid-cols-2 gap-2 pt-3">
                            <SheetClose className="border px-4 rounded hover:bg-gray-100">Cancelar</SheetClose>

                            <Button disabled={form.formState.isSubmitting} className="" type="submit">
                                {form.formState.isSubmitting && <div className="size-4 rounded-full border-y border-l animate-spin" />}

                                <span className="">{  form.formState.isSubmitting ? "Guardando..." : "Guardar" }</span>
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </div>
        </ModalWrapper>
    );
}

export default FuelTypeModal;