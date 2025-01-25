"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import SheetWrapper from "@/components/common/SheetWrapper";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { vehicleFormSchema, VehicleFormSchema } from "@/utils/form/vehicles";
import { Brand, FuelType, Model, Vehicle, VehicleType } from "@prisma/client";
import ErrorMessage from "@/components/common/ErrorMessage";
import { getListData, handleFetchAction } from "@/utils/handleFetchAction";

interface VehicleSheetProps {
    vehicle?: Vehicle;
    updateVehicle?: boolean;
    children?: React.ReactNode;
}

const VehicleSheet: React.FC<VehicleSheetProps> = ({
    vehicle, updateVehicle, children
}) => {
    const [error, setError] = useState<string>("");
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

    const form = useForm<VehicleFormSchema>({
        resolver: zodResolver(vehicleFormSchema),
        defaultValues: {
            description: "", chassisNumber: "", engineNumber: "",
            plateNumber: "", vehicleTypeId: undefined, brandId: undefined,
            modelId: undefined, fuelTypeId: undefined, status: "Disponible",
        },
    });

    useEffect(() => {
        const getData = async () => {
            const brands = await getListData<Brand>("/api/brand");
            const models = await getListData<Model>("/api/model");
            const fuelTypes = await getListData<FuelType>("/api/fuel-type");
            const vehicleTypes = await getListData<VehicleType>("/api/vehicle-type");

            setBrands(updateVehicle ? brands : brands.filter((brand) => brand.status === "Activo"));
            setModels(updateVehicle ? models : models.filter((model) => model.status === "Activo"));
            setFuelTypes(updateVehicle ? fuelTypes : fuelTypes.filter((fuelType) => fuelType.status === "Activo"));
            setVehicleTypes(updateVehicle ? vehicleTypes : vehicleTypes.filter((vehicleType) => vehicleType.status === "Activo"));
        };

        getData();
    }, [updateVehicle]);

    useEffect(() => {
        if (updateVehicle) {
            form.setValue("id", vehicle!.id);
            form.setValue("description", vehicle!.description);
            form.setValue("chassisNumber", vehicle!.chassisNumber);
            form.setValue("engineNumber", vehicle!.engineNumber);
            form.setValue("plateNumber", vehicle!.plateNumber);
            form.setValue("vehicleTypeId", vehicle!.vehicleTypeId);
            form.setValue("brandId", vehicle!.brandId);
            form.setValue("modelId", vehicle!.modelId);
            form.setValue("fuelTypeId", vehicle!.fuelTypeId);
            form.setValue("status", vehicle!.status);
        }
    }, [form, updateVehicle, vehicle]);

    const onSubmit = async (values: VehicleFormSchema) => {
        setError("");
        
        const fetchMethod = updateVehicle ? "PUT" : "POST";
        const url = updateVehicle ? `/api/vehicle/update` : `/api/vehicle/create`;

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
        <SheetWrapper
            title={updateVehicle ? "Editar Vehiculo" : "Añadir Vehiculo"}
            description={updateVehicle ? `LLena el formulario para editar el vehiculo ${vehicle?.description}`
                : "LLena el formulario para añadir un nuevo vehiculo a la lista."
            }
            trigger={updateVehicle ? children : <Button className="">Añadir Vehiculo</Button>}
        >
            <div className="h-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-3 justify-between flex-col h-full pb-[10rem]">
                        {error && <ErrorMessage error={error} />}
                        
                        <div className="space-y-5 overflow-auto">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: Mercedes Benz" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="chassisNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Cabecera <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: 123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="engineNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Motor <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: 123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="plateNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Placa <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="text" placeholder="ex: 123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="vehicleTypeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Vehículo <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de vehículo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {vehicleTypes.map((vehicleType) => (
                                                        <SelectItem
                                                            key={vehicleType.id}
                                                            value={vehicleType.id.toString()}
                                                        >
                                                            {vehicleType.description}
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
                                name="brandId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Marca <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona una marca" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {brands.map((brand) => (
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
                                name="modelId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Modelo <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un modelo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {models.map((model) => (
                                                        <SelectItem
                                                            key={model.id}
                                                            value={model.id.toString()}
                                                        >
                                                            {model.description}
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
                                name="fuelTypeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Combustible <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de combustible" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {fuelTypes.map((fuelType) => (
                                                        <SelectItem
                                                            key={fuelType.id}
                                                            value={fuelType.id.toString()}
                                                        >
                                                            {fuelType.description}
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
                                                    <SelectItem value="Disponible">Disponible</SelectItem>
                                                    <SelectItem value="Alquilado">Alquilado</SelectItem>
                                                    <SelectItem value="En reparación">En Reparación</SelectItem>
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

                                    <span className="">Guardar</span>
                                </Button>
                            </SheetFooter>
                        </div>
                    </form>
                </Form>
            </div>
        </SheetWrapper>
    );
}   

export default VehicleSheet;