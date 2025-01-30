import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/libs/prisma.config";
import { brandsColumns } from "./brandsColumns";
import BrandModal from "./BrandModal";

const Brands: React.FC = async () => {
    const brands = await prisma.brand.findMany();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Marcas</h1>

                <BrandModal />
            </div>

            <DataTable hint="description"
                columns={brandsColumns}
                data={brands}
                searchBy="description"
            />
        </div>
    );
}

export default Brands;