import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/libs/prisma.config";
import { FuelType } from "@prisma/client";
import { fuelsColumns } from "./fuelsColumns";
import FuelTypeModal from "./FuelType";

const FuelTypes: React.FC = async () => {
    const models: FuelType[] = await prisma.fuelType.findMany();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Modelos</h1>

                <FuelTypeModal />
            </div>

            <DataTable hint="description"
                columns={fuelsColumns}
                data={models}
                searchBy="description"
            />
        </div>
    );
}

export default FuelTypes;