import { DataTable } from "@/components/ui/data-table";

import { prisma } from "@/libs/prisma.config";
import { vehiclesColumns } from "./vehiclesColumns";
import AddVehicleSheet from "./VehicleSheet";
import { Vehicle } from "@prisma/client";

const Vehicles: React.FC = async () => {
    const vehicles: Vehicle[] = await prisma.vehicle.findMany({
        include: {
            brand: true, model: true,
            fuelType: true, vehicleType: true,
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Vehículos</h1>

                <AddVehicleSheet />
            </div>

            <DataTable hint="placa"
                columns={vehiclesColumns}
                data={vehicles}
                searchBy="plateNumber"
            />
        </div>
    );
}

export default Vehicles;