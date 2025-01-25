import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { employeeFormSchema } from "@/utils/form/employee";

export async function POST(req: Request) {
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

        const existedEmailEmployee = await prisma.employee.findUnique({
            where: {
                email: body.email,
            },
        });

        if (existedEmailEmployee) {
            return NextResponse.json({
                message: "Ya existe un empleado con el mismo email.",
            }, { status: 400 });
        }

        const existedDocumentIdEmployee = await prisma.employee.findFirst({
            where: { documentId: body.documentId },
        });

        if (existedDocumentIdEmployee) {
            return NextResponse.json({
                message: "Existe un empleado con el mismo documento",
            }, { status: 400 });
        }

        await prisma.employee.create({ data: body });

        return NextResponse.json({
            message: "Empleado creado correctamente."
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message
        }, { status: 500 });
    }
}
