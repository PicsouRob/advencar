"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import ModalWrapper from "@/components/common/ModalWrapper";
import { modelFormSchema, ModelFormSchema } from "@/utils/form/models";
import { Brand, Model } from "@prisma/client";
import ErrorMessage from "@/components/common/ErrorMessage";
import { getListData, handleFetchAction } from "@/utils/handleFetchAction";

interface ModelModalProps {
    model?: Model;
    updateModel?: boolean;
    children?: React.ReactNode;
}

const ModelModal: React.FC<ModelModalProps> = ({
    model, updateModel, children
}) => {
    const [error, setError] = useState<string>("");
    const [modelBrands, setModelBrands] = useState<Brand[]>([]);

    const form = useForm<ModelFormSchema>({
        resolver: zodResolver(modelFormSchema),
        defaultValues: {
            brandId: undefined, description: "", status: "Activo",
        },
    });

    useEffect(() => {
        if (updateModel) {
            form.setValue("id", model!.id);
            form.setValue("brandId", model!.brandId);
            form.setValue("description", model!.description);
            form.setValue("status", model!.status);
        }

        const getBrands = async () => {
            const brands = await getListData<Brand>("/api/brand");

            setModelBrands(updateModel ? brands : brands.filter((brand) => brand.status === "Activo"));
        }

        getBrands();
    }, [form, updateModel, model]);

    const onSubmit = async (values: ModelFormSchema) => {
        setError("");

        const fetchMethod = updateModel ? "PUT" : "POST";
        const url = updateModel ? `/api/model/update` : `/api/model/create`;
        
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
            title={updateModel ? "Editar Modelo" : "Añadir Modelo"}
            description={updateModel ? `LLena el formulario para editar el modelo ${model?.description}`
                : "LLena el formulario para añadir un nuevo modelo a la lista."
            }
            trigger={updateModel ? children : <Button className="">Añadir Modelo</Button>}
        >
            <div className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 h-full">
                        <div className="space-y-5">
                            {error && <ErrorMessage error={error} />}

                            <FormField
                                control={form.control}
                                name="brandId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Marca <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona una marca" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {modelBrands.map((brand) => (
                                                        <SelectItem
                                                            key={brand.id}
                                                            value={brand.id.toString()}
                                                        >
                                                            {brand.description}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

export default ModelModal;