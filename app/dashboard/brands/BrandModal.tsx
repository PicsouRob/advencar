"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import ModalWrapper from "@/components/common/ModalWrapper";
import { brandFormSchema, BrandFormSchema } from "@/utils/form/brands";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Brand } from "@prisma/client";
import { handleFetchAction } from "@/utils/handleFetchAction";

type BrandModalProps = {
    brand?: Brand;
    updateBrand?: boolean;
    children?: React.ReactNode;
}

const BrandModal: React.FC<BrandModalProps> = ({ brand, updateBrand, children }) => {
    const [error, setError] = useState<string>("");

    const form = useForm<BrandFormSchema>({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            description: "", status: "Activo",
        },
    });

    useEffect(() => {
        if (updateBrand) {
            form.setValue("id", brand!.id);
            form.setValue("description", brand!.description);
            form.setValue("status", brand!.status);
        }
    });

    const onSubmit = async (values: BrandFormSchema) => {
        setError("");

        const fetchMethod = updateBrand ? "PUT" : "POST";
        const url = updateBrand ? `/api/brand/update` : `/api/brand/create`;
        
        await handleFetchAction(
            values, fetchMethod, url, (isCompleted, message) => {
                if(isCompleted) {
                    alert(message);
                    
                    window.location.reload();
                } else {
                    setError(message);
                }
            }
        );
    }

    return (
        <ModalWrapper
            title={updateBrand ? "Editar Marca" : "Añadir Marca"}
            description={updateBrand ? `LLena el formulario para editar la marca ${brand?.description}`
                : "LLena el formulario para añadir una nueva marca a la lista."
            }
            trigger={updateBrand ? children : <Button className="">Añadir Marca</Button>}
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

                                <span className="">{ form.formState.isSubmitting ? "Guardando..." : "Guardar" }</span>
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </div>
        </ModalWrapper>
    );
}

export default BrandModal;