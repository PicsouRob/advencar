import { prisma } from '@/libs/prisma.config';

import { customersColumns } from './columns';
import CustomerSheet from './CustomerSheet';
import { DataTable } from '@/components/ui/data-table';

const Customers = async () => {
    const customers = await prisma.customer.findMany();

    return (
        <div className='space-y-6'>
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Clientes</h1>

                <CustomerSheet />
            </div>

            <DataTable hint="nombre"
                columns={customersColumns} 
                data={customers} 
                searchBy="name" 
            />
        </div>
    );
}

export default Customers;