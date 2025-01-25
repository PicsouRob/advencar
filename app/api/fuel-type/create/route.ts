import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { fuelTypeFormSchema } from "@/utils/form/fuel-type";

export async function POST(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateFuelType = fuelTypeFormSchema.safeParse(body);

        if (!validateFuelType.success) {
            const { errors } = validateFuelType.error;

            return NextResponse.json({
                message: errors.map(error => error.message).join(", ")
            }, { status: 400 });
        }

        const existedFuelType = await prisma.fuelType.findFirst({
            where: { description: body.description },
        });

        if (existedFuelType) {
            return NextResponse.json({
                message: "Ya existe un tipo de combustible con el mismo nombre.",
            }, { status: 400 });
        }

        await prisma.fuelType.create({ data: body });

        return NextResponse.json({
            message: "Nuevo tipo de combustible creado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
