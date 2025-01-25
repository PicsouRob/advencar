"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import SheetWrapper from "@/components/common/SheetWrapper";
import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem,
    FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { inspectionFormSchema, InspectionFormSchema } from "@/utils/form/inspections";
import { Vehicle, Customer, Employee, Inspection } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserSessionProps, useUserSession } from "@/hooks/useUserSession";
import ErrorMessage from "@/components/common/ErrorMessage";
import { getListData, handleFetchAction } from "@/utils/handleFetchAction";

interface InspectionSheetProps {
    inspection?: Inspection;
    updateInspection?: boolean;
    children?: React.ReactNode;
}

const InspectionSheet: React.FC<InspectionSheetProps> = ({
    inspection, updateInspection, children
}) => {
    const [error, setError] = useState<string>("");
    const { user }: UserSessionProps = useUserSession();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);

    const form = useForm<InspectionFormSchema>({
        resolver: zodResolver(inspectionFormSchema),
        defaultValues: {
            vehicleId: undefined, customerId: undefined, transactionId: 1,
            scratches: false, fuelAmount: "",
            hasSpareTire: false, hasJack: false, hasGlassDamage: false,
            tireStatus: "", inspectionDate: new Date(),
            status: "Pendiente", employeeId: undefined,
        },
    });

    useEffect(() => {
        form.setValue("employeeId", Number(user?.sub));

        if(updateInspection) {
            form.setValue("id", inspection!.id);
            form.setValue("vehicleId", inspection!.vehicleId);
            form.setValue("customerId", inspection!.customerId);
            form.setValue("transactionId", inspection!.transactionId);
            form.setValue("scratches", inspection!.scratches);
            form.setValue("fuelAmount", inspection!.fuelAmount);
            form.setValue("hasSpareTire", inspection!.hasSpareTire);
            form.setValue("hasJack", inspection!.hasJack);
            form.setValue("hasGlassDamage", inspection!.hasGlassDamage);
            form.setValue("tireStatus", inspection!.tireStatus);
            form.setValue("inspectionDate", inspection!.inspectionDate);
            form.setValue("status", inspection!.status);
            form.setValue("employeeId", inspection!.employeeId);
        }
    }, [user?.sub, form, updateInspection, inspection]);

    useEffect(() => {
        const getData = async () => {
            const vehicles = await getListData<Vehicle>("/api/vehicle");
            const customers = await getListData<Customer>("/api/customer");
            const employees = await getListData<Employee>("/api/employee");

            setVehicles(updateInspection ? vehicles : vehicles.filter((vehicle) => vehicle.status === "Disponible"));
            setCustomers(updateInspection ? customers : customers.filter((customer) => customer.status === "Activo"));
            setEmployees(updateInspection ? employees : employees.filter((employee) => employee.status === "Activo"));
        };

        getData();
    }, [updateInspection]);

    const onSubmit = async (values: InspectionFormSchema) => {
        setError("");

        const fetchMethod = updateInspection ? "PUT" : "POST";
        const url = updateInspection ? `/api/inspection/update` : `/api/inspection/create`;

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
            title={updateInspection ? "Editar Inspección" : "Añadir Inspección"}
            description={updateInspection ? `LLena el formulario para editar la inspección ${inspection?.vehicleId}`
                : "LLena el formulario para añadir una nueva inspection a la lista."
            }
            trigger={updateInspection ? children : <Button className="">Añadir Inspection</Button>}
        >
            <div className="h-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-3 justify-between flex-col h-full pb-[10rem]">
                        {error && <ErrorMessage error={error} />}
                       
                        <div className="space-y-5 overflow-auto">
                            <FormField
                                control={form.control}
                                name="vehicleId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vehículo <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un vehículo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {vehicles.map((vehicle) => (
                                                        <SelectItem
                                                            key={vehicle.id}
                                                            value={vehicle.id.toString()}
                                                        >
                                                            {vehicle.description}
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
                                name="customerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cliente <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value === undefined ? "" : field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un cliente" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {customers.map((customer) => (
                                                        <SelectItem
                                                            key={customer.id}
                                                            value={customer.id.toString()}
                                                        >
                                                            {customer.name}
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
                                name="employeeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Empleado <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value.toString()}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un empleado" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {employees.map((employee) => (
                                                        <SelectItem
                                                            key={employee.id}
                                                            value={employee.id.toString()}
                                                        >
                                                            {employee.name}
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
                                name="fuelAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cantidad de Combustible <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona cantidad de combustible" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="1/4">1/4</SelectItem>
                                                    <SelectItem value="1/2">1/2</SelectItem>
                                                    <SelectItem value="3/4">3/4</SelectItem>
                                                    <SelectItem value="full">Full</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tireStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Info de Llantas <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="ex: Llantas rotas" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}                                
                            />

                            <FormField
                                control={form.control}
                                name="inspectionDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Inspection <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="date"
                                                placeholder="dd/mm/aaaa"
                                                value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                                                onChange={(event) => field.onChange(new Date(event.target.value))}
                                            />
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
                                            <Select {...field}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                                                    <SelectItem value="Aprobado">Aprobado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="scratches"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Escápulas <span className="text-red-600">*</span></FormLabel> */}
                                        <FormControl className="">
                                            <div className="items-top flex gap-x-2">
                                                <Checkbox id="scratches"
                                                    // {...field}
                                                    checked={field.value}
                                                    onCheckedChange={(value) => field.onChange(value || false)}
                                                />

                                                <Label htmlFor="scratches" className="">
                                                    <p 
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >Escápulas
                                                    </p>

                                                    <span className="text-sm text-muted-foreground">
                                                        Indica si hay escápulas en el vehículo.
                                                    </span>
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hasSpareTire"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="items-top flex gap-x-2">
                                                <Checkbox id="hasSpareTire"
                                                    // {...field}
                                                    checked={field.value}
                                                    onCheckedChange={(value) => field.onChange(value || false)}
                                                />

                                                <Label htmlFor="hasSpareTire" className="">
                                                    <p 
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >Llanta Extra
                                                    </p>

                                                    <span className="text-sm text-muted-foreground">
                                                        Indica si hay llanta extra en el vehículo.
                                                    </span>
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hasJack"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="items-top flex gap-x-2">
                                                <Checkbox id="hasJack"
                                                    // {...field}
                                                    checked={field.value}
                                                    onCheckedChange={(value) => field.onChange(value || false)}
                                                />

                                                <Label htmlFor="hasJack" className="">
                                                    <p 
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >Jack
                                                    </p>

                                                    <span className="text-sm text-muted-foreground">
                                                        Indica si hay Jack en el vehículo.
                                                    </span>
                                                </Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hasGlassDamage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="items-top flex gap-x-2">
                                                <Checkbox id="hasGlassDamage"
                                                    // {...field}
                                                    checked={field.value}
                                                    onCheckedChange={(value) => field.onChange(value || false)}
                                                />

                                                <Label htmlFor="hasGlassDamage" className="">
                                                    <p 
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >Daño de Visión
                                                    </p>

                                                    <span className="text-sm text-muted-foreground">
                                                        Indica si hay daño de visión en el vehículo.
                                                    </span>
                                                </Label>
                                            </div>
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

                                    <span className="">{ form.formState.isSubmitting ? "Guardando..." : "Guardar" }</span>
                                </Button>
                            </SheetFooter>
                        </div>
                    </form>
                </Form>
            </div>
        </SheetWrapper>
    );
}   

export default InspectionSheet;