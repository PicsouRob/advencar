import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { clientFormSchema } from "@/utils/form/client";

export async function PUT(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN", "ASSISTANT"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateCustomer = clientFormSchema.safeParse(body);

        if (!validateCustomer.success) {
            const { errors } = validateCustomer.error;

            return NextResponse.json({ errors }, { status: 400 });
        }

        await prisma.customer.update({
            where: {
                id: Number(body.id),
            },
            data: body,
        });

        return NextResponse.json({
            message: "Cliente actualizado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
