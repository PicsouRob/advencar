import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { fuelTypeFormSchema } from "@/utils/form/fuel-type";

export async function PUT(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateFuelType = fuelTypeFormSchema.safeParse(body);

        if (!validateFuelType.success) {
            const { errors } = validateFuelType.error;

            return NextResponse.json({ errors }, { status: 400 });
        }

        await prisma.fuelType.update({
            where: { id: Number(body.id) },
            data: body,
        });

        return NextResponse.json({
            message: "Tipo de combustible actualizado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
