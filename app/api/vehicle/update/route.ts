import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { vehicleFormSchema } from "@/utils/form/vehicles";

export async function PUT(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN", "ASSISTANT"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateVehicle = vehicleFormSchema.safeParse(body);

        if (!validateVehicle.success) {
            const { errors } = validateVehicle.error;

            return NextResponse.json({ errors }, { status: 400 });
        }

        await prisma.vehicle.update({
            where: {
                id: Number(body.id),
            },
            data: body,
        });

        return NextResponse.json({
            message: "Vehículo actualizado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
