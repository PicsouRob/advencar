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
import { vehicleTypeFormSchema, VehicleTypeFormSchema } from "@/utils/form/vehicle-type";
import ErrorMessage from "@/components/common/ErrorMessage";
import { VehicleType } from "@prisma/client";
import { handleFetchAction } from "@/utils/handleFetchAction";

interface VehicleTypeModalProps {
    vehicleType?: VehicleType;
    updateVehicleType?: boolean;
    children?: React.ReactNode;
}

const VehicleTypeModal: React.FC<VehicleTypeModalProps> = (
    { vehicleType, updateVehicleType, children }
) => {
    const [error, setError] = useState<string>("");
    
    const form = useForm<VehicleTypeFormSchema>({
        resolver: zodResolver(vehicleTypeFormSchema),
        defaultValues: {
            description: "", status: "Activo",
        },
    });

    useEffect(() => {
        if (updateVehicleType) {
            form.setValue("id", vehicleType!.id);
            form.setValue("description", vehicleType!.description);
            form.setValue("status", vehicleType!.status);
        }
    }, [form, updateVehicleType, vehicleType]);

    const onSubmit = async (values: VehicleTypeFormSchema) => {
        setError("");

        const fetchMethod = updateVehicleType ? "PUT" : "POST";
        const url = updateVehicleType ? `/api/vehicle-type/update` : `/api/vehicle-type/create`;
        
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
            title={updateVehicleType ? "Editar Tipo de Vehículo" : "Añadir Tipo de Vehículo"}
            description={updateVehicleType ? `LLena el formulario para editar el tipo de vehículo ${vehicleType?.description}`
                : "LLena el formulario para añadir un nuevo tipo de vehículo a la lista."
            }
            trigger={updateVehicleType ? children : <Button className="">Añadir Tipo de Vehículo</Button>}
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

export default VehicleTypeModal;