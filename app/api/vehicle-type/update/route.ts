import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { vehicleTypeFormSchema } from "@/utils/form/vehicle-type";

export async function PUT(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateVehicleType = vehicleTypeFormSchema.safeParse(body);

        if (!validateVehicleType.success) {
            const { errors } = validateVehicleType.error;

            return NextResponse.json({ 
                message: errors.map(error => error.message).join(", ")
             }, { status: 400 });
        }

        await prisma.vehicleType.update({
            where: { id: Number(body.id) },
            data: body,
        });

        return NextResponse.json({
            message: "Tipo de vehículo actualizado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
