import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/libs/prisma.config";
import { VehicleType } from "@prisma/client";
import { vehiclesColumns } from "./vehiclesColumns";
import VehicleTypeModal from "./VehicleTypeModal";

const VehiclesTypes: React.FC = async () => {
    const vehiclesTypes: VehicleType[] = await prisma.vehicleType.findMany();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Modelos</h1>

                <VehicleTypeModal />
            </div>

            <DataTable hint="description"
                columns={vehiclesColumns}
                data={vehiclesTypes}
                searchBy="description"
            />
        </div>
    );
}

export default VehiclesTypes;