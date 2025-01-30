import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/libs/prisma.config";
import { inspectionColumns } from "./inspectionColumns";
import InspectionSheet from "./InspectionSheet";

const Inspections: React.FC = async () => {
    const inspections = await prisma.inspection.findMany({
        include: {
            vehicle: true, customer: true,
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Inspectiones</h1>

                <InspectionSheet />
            </div>

            <DataTable hint="vehiculo" 
                columns={inspectionColumns} 
                data={inspections} 
                searchBy="status"
            />
        </div>
    );
}

export default Inspections;