import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/libs/prisma.config";
import { rentalColumns } from "./rentalColumns";
import RentSheet from "./RentSheet";

const Rentals: React.FC = async () => {
    const rentals = await prisma.rent.findMany({
        include: {
            employee: true, vehicle: true, customer: true,
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Alquileres</h1>

                <RentSheet />
            </div>

            <DataTable
                hint="empleado"
                columns={rentalColumns}
                data={rentals}
                searchBy="days"
            />
        </div>
    );
}

export default Rentals;