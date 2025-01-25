import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/libs/prisma.config";
import { modelsColumns } from "./modelsColumns";
import ModelModal from "./ModelModal";

const Models: React.FC = async () => {
    const models = await prisma.model.findMany({
        include: {
            brand: true,
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Modelos</h1>

                <ModelModal />
            </div>

            <DataTable hint="description"
                columns={modelsColumns}
                data={models}
                searchBy="description"
            />
        </div>
    );
}

export default Models;