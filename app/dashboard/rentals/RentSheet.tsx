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
import { rentFormSchema, RentFormSchema } from "@/utils/form/rents";
import { Customer, Rent, Vehicle } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import ErrorMessage from "@/components/common/ErrorMessage";
import { UserSessionProps, useUserSession } from "@/hooks/useUserSession";
import { getListData, handleFetchAction } from "@/utils/handleFetchAction";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AddRentSheetProps {
    rent?: Rent;
    updateRent?: boolean;
    children?: React.ReactNode;
}

const RentSheet: React.FC<AddRentSheetProps> = ({
    rent, updateRent, children
}) => {
    const { user }: UserSessionProps = useUserSession();
    const [error, setError] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const customers: Customer[] = await getListData<Customer>("/api/customer");
            const vehicles: Vehicle[] = await getListData<Vehicle>("/api/vehicle");

            setCustomers(updateRent ? customers : customers.filter((customer) => customer.status === "Activo"));
            setVehicles(updateRent ? vehicles : vehicles.filter((vehicle) => vehicle.status === "Disponible"));
        };

        getData();
    }, [updateRent]);

    const form = useForm<RentFormSchema>({
        resolver: zodResolver(rentFormSchema),
        defaultValues: {
            employeeId: Number(user?.sub), vehicleId: undefined, customerId: undefined,
            rentDate: new Date(), returnDate: undefined, dailyRate: undefined,
            days: undefined, comments: "", status: "Activo",
        },
    });

    useEffect(() => {
        form.setValue("employeeId", Number(user?.sub));

        if (updateRent) {
            form.setValue("id", rent!.id);
            form.setValue("vehicleId", rent!.vehicleId);
            form.setValue("employeeId", rent!.employeeId);
            form.setValue("customerId", rent!.customerId);
            form.setValue("rentDate", rent!.rentDate);
            form.setValue("returnDate", rent!.returnDate);
            form.setValue("dailyRate", rent!.dailyRate);
            form.setValue("days", rent!.days);
            form.setValue("comments", rent!.comments!);
            form.setValue("status", rent!.status);
        }
    }, [form, updateRent, rent, user]);

    const onSubmit = async (values: RentFormSchema) => {
        setError("");

        const fetchMethod = updateRent ? "PUT" : "POST";
        const url = updateRent ? `/api/rent/update` : `/api/rent/create`;

        await handleFetchAction(
            values, fetchMethod, url, (isCompleted, message) => {
                if (isCompleted) {
                    router.refresh();
                    setIsOpen(false);

                    toast({
                        title: "Creación de alquiler",
                        description: message,
                        duration: 4000,
                    });
                } else {
                    setError(message);
                }
            }
        );
    }

    return (
        <SheetWrapper
            isOpen={isOpen}
            setOpen={setIsOpen}
            title={updateRent ? "Editar Alquiler" : "Añadir Alquiler"}
            description={updateRent ? `LLena el formulario para editar el alquiler ${rent?.vehicleId}`
                : "LLena el formulario para añadir un nuevo alquiler a la lista."
            }
            trigger={updateRent ? children : <Button className="">Añadir Alquiler</Button>}
        >
            <div className="h-full space-y-">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex space-y-3 justify-between flex-col h-full pb-[10rem]"
                    >
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
                                                value={field.value ? field.value.toString() : ""}
                                                onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un vehículo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {vehicles.map((vehicle) => (
                                                        <SelectItem
                                                            key={vehicle.id}
                                                            value={vehicle.id.toString()}>
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
                                                value={field.value ? field.value.toString() : ""}
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
                                name="rentDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Alquiler <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="date" placeholder="dd/mm/aaaa"
                                                {...field}
                                                value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                                onChange={(event) => field.onChange(new Date(event.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="returnDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Retorno <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="date" placeholder="dd/mm/aaaa"
                                                {...field}
                                                value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                                onChange={(event) => field.onChange(new Date(event.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dailyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tarifa Diaria <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="ex: 1000" {...field}
                                                value={field.value ? field.value.toString() : ""}
                                                onChange={(event) => field.onChange(parseInt(event.target.value, 10))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="days"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Días <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="ex: 5" {...field}
                                                value={field.value ? field.value.toString() : ""}
                                                onChange={(event) => field.onChange(parseInt(event.target.value, 10))}
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
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Activo">Activo</SelectItem>
                                                    <SelectItem value="Finalizado">Finalizado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="comments"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comentarios <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} placeholder="Comentarios" {...field} />
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

                                    <span className="">
                                        {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
                                    </span>
                                </Button>
                            </SheetFooter>
                        </div>
                    </form>
                </Form>
            </div>
        </SheetWrapper>
    );
}   

export default RentSheet;