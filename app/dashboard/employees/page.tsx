import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/libs/prisma.config";
import { employeeColumns } from "./employeeColumns";
import EmployeeSheet from "./EmployeeSheet";

const Employees: React.FC = async () => {
    const employees = await prisma.employee.findMany();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-x-4">
                <h1 className="text-[1.20rem] font-bold">Lista de Empleados</h1>

                <EmployeeSheet />
            </div>

            <DataTable hint="nombre" 
                columns={employeeColumns} 
                data={employees} 
                searchBy="name" 
            />
        </div>
    );
}

export default Employees;
