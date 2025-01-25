import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { clientFormSchema } from "@/utils/form/client";

export async function POST(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN", "ASSISTANT"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateCustomer = clientFormSchema.safeParse(body);

        if (!validateCustomer.success) {
            const { errors } = validateCustomer.error;

            return NextResponse.json({
                message: errors.map(error => error.message).join(", ")
            }, { status: 400 });
        }

        const existedCustomer = await prisma.customer.findFirst({
            where: { name: body.name },
        });

        if (existedCustomer) {
            return NextResponse.json({
                message: "Ya existe un cliente con el mismo nombre.",
            }, { status: 400 });
        }

        const existedDocumentIdCustomer = await prisma.customer.findFirst({
            where: { documentId: body.documentId },
        });

        if (existedDocumentIdCustomer) {
            return NextResponse.json({
                message: "Ya existe un cliente con el mismo documento.",
            }, { status: 400 });
        }

        await prisma.customer.create({ data: body });

        return NextResponse.json({
            message: "Nuevo cliente creado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
