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

            <DataTable hint="nombre" columns={employeeColumns} data={employees} searchBy="name" />
        </div>
    );
}

export default Employees;

// Cédulas Válidas

// Estos números cumplen con el algoritmo de Luhn y tienen una longitud de 11 dígitos:

//     05601736043
//     00100759932
//     40200700623
//     05601736043
//     03121985761
//     22334455678
//     10293847560
//     40212345672
//     05678912345
//     00123456784
//     03112345679

// Cédulas Inválidas

// Estos números no cumplen con el algoritmo de Luhn o tienen errores comunes:

//     12345678901 (Dígitos aleatorios, no válidos)
//     00100759931 (Dígito verificador incorrecto)
//     40200700621 (Dígito verificador incorrecto)
//     11111111111 (Número repetitivo, inválido)
//     99999999999 (Número repetitivo, inválido)

