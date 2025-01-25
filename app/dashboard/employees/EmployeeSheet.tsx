"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SheetWrapper from "@/components/common/SheetWrapper";
import { Button } from "@/components/ui/button";
import { employeeFormSchema, EmployeeFormSchema } from "@/utils/form/employee";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Employee } from "@prisma/client";
import { handleFetchAction } from "@/utils/handleFetchAction";

interface EmployeeSheetProps {
    employee?: Employee;
    updateEmployee?: boolean;
    children?: React.ReactNode;
}

const EmployeeSheet: React.FC<EmployeeSheetProps> = ({
    employee, updateEmployee, children
}) => {
    const [error, setError] = useState<string>("");

    const form = useForm<EmployeeFormSchema>({
        resolver: zodResolver(employeeFormSchema),
        defaultValues: {
            name: "", email: "", password: "", workShift: "Diurna",
            status: "Activo", documentId: "", hireDate: new Date(),
            role: "ASSISTANT", commissionPct: 0
        },
    });

    useEffect(() => {
        if (updateEmployee) {
            form.setValue("id", employee!.id);
            form.setValue("name", employee!.name);
            form.setValue("email", employee!.email);
            form.setValue("documentId", employee!.documentId);
            form.setValue("password", employee!.password);
            form.setValue("workShift", employee!.workShift);
            form.setValue("status", employee!.status);
            form.setValue("hireDate", employee!.hireDate);
            form.setValue("role", employee!.role);
            form.setValue("commissionPct", employee!.commissionPct);
        }
    }, [form, updateEmployee, employee]);

    const onSubmit = async (values: EmployeeFormSchema) => {
        setError("");

        const fetchMethod = updateEmployee ? "PUT" : "POST";
        const url = updateEmployee ? `/api/employee/update` : `/api/employee/create`;
        
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
            title={updateEmployee ? "Editar Empleado" : "Añadir Empleado"}
            description={updateEmployee ? `LLena el formulario para editar el empleado ${employee?.name}`
                : "LLena el formulario para añadir un nuevo empleado a la lista."
            }
            trigger={updateEmployee ? children : <Button className="">Añadir Empleado</Button>}
        >
            <div className="h-full" id="top">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-3 justify-betwee flex-col h-full pb-[10rem]">
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input autoComplete='additional-name' type="email" placeholder="ex: juanperez@gmail.com" {...field} />
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
                                            <Input type="text" placeholder="ex: 00100759932" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="workShift"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Horario de Trabajo <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un horario de trabajo" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Diurna">Diurna</SelectItem>
                                                    <SelectItem value="Nocturna">Nocturna</SelectItem>
                                                    <SelectItem value="Mixta">Mixta</SelectItem>
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
                                            <Select
                                                {...field}
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

                            <FormField
                                control={form.control}
                                name="hireDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Contratación <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                placeholder="dd/mm/aaaa"
                                                {...field}
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
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rol <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un rol" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="ASSISTANT">Asistente</SelectItem>
                                                    <SelectItem value="ADMIN">Administrador</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="commissionPct"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comisión <span className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="ex: 0.00"
                                                {...field}
                                                value={field.value ? Number(field.value) : 0}
                                                onChange={(event) => field.onChange(Number(event.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4">
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

export default EmployeeSheet;