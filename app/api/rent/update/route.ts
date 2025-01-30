import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { rentFormSchema } from "@/utils/form/rents";

export async function PUT(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ASSISTANT", "ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateRent = rentFormSchema.safeParse(body);

        if (!validateRent.success) {
            const { errors } = validateRent.error;

            return NextResponse.json({ 
                message: errors.map(error => error.message).join(", ")
             }, { status: 400 });
        }

        await prisma.rent.update({
            where: {
                id: Number(body.id),
            },
            data: body,
        });

        return NextResponse.json({
            message: "Alquiler actualizado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
