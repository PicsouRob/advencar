"use client";

import { useEffect, useState } from "react";

import SheetWrapper from "@/components/common/SheetWrapper";
import { getListData } from "@/utils/handleFetchAction";
import { Customer, Employee, Inspection, Vehicle } from "@prisma/client";
import DetailRow from "@/components/common/DetailRow";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/date";

type InspectionDetailSheetProps = {
    inspection: Inspection;
    children: React.ReactNode;
}

const InspectionDetailSheet: React.FC<InspectionDetailSheetProps> = ({
    inspection, children
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [vehicleName, setVehicleName] = useState<string>("");
    const [customerName, setCustomerName] = useState<string>("");
    const [employeeName, setEmployeeName] = useState<string>("");

    useEffect(() => {
        const getDats = async () => { 
            const vehicles = (await getListData<Vehicle>("/api/vehicle"));
            const findedVehicle = vehicles.find((vehicle) => vehicle.id === inspection.vehicleId);
            const customers = (await getListData<Customer>("/api/customer"));
            const findedCustomer = customers.find((customer) => customer.id === inspection.customerId);
            const employees = (await getListData<Employee>("/api/employee"));
            const findedEmployee = employees.find((employee) => employee.id === inspection.employeeId);

            setVehicleName(findedVehicle!.description);
            setCustomerName(findedCustomer!.name);
            setEmployeeName(findedEmployee!.name);
        }

        getDats();
    }, [inspection]);

    return (
        <SheetWrapper
            isOpen={isOpen} setOpen={setIsOpen}
            title="Detalles de Inspection"
            description={`Detalles de la inspection ${vehicleName}.`}
            trigger={children}
        >
            <div className="space-y-3 overflow-auto mt-4">
                {/* <DetailRow label="Número de Transacción" value={inspection.transactionId} /> */}
                <DetailRow label="Vehículo" value={vehicleName} />
                <Separator />
                <DetailRow label="Cliente" value={customerName} />
                <Separator />
                <DetailRow label="Info de Llantas" value={inspection.tireStatus} />
                <Separator />
                <DetailRow label="Estado" value={inspection.status} />
                <Separator />
                <DetailRow label="Fecha de Inspection" value={formatDate(inspection.inspectionDate.toString())} />
                <Separator />
                <DetailRow label="Escápulas" value={inspection.scratches ? "Si" : "No"} />
                <Separator />
                <DetailRow label="Llanta Extra" value={inspection.hasSpareTire ? "Si" : "No"} />
                <Separator />
                <DetailRow label="Jack" value={inspection.hasJack ? "Si" : "No"} />
                <Separator />
                <DetailRow label="Daño de Visión" value={inspection.hasGlassDamage ? "Si" : "No"} />
                <Separator />
                <DetailRow label="Cantidad de Combustible" value={inspection.fuelAmount} />
                <Separator />
                <DetailRow label="Por Empleado" value={employeeName} />
            </div>
        </SheetWrapper>
    );
}

export default InspectionDetailSheet;