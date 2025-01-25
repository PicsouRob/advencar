import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { employeeFormSchema } from "@/utils/form/employee";

export async function PUT(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateEmployee = employeeFormSchema.safeParse(body);

        if (!validateEmployee.success) {
            const { errors } = validateEmployee.error;

            return NextResponse.json({
                message: errors.map(error => error.message).join(", ")
            }, { status: 400 });
        }

        await prisma.employee.update({
            where: { id: body.id },
            data: body,
        });

        return NextResponse.json({
            message: "Empleado actualizado correctamente."
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message
        }, { status: 500 });
    }
}
