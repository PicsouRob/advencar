import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { vehicleFormSchema } from "@/utils/form/vehicles";

export async function POST(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN", "ASSISTANT"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateVehicle = vehicleFormSchema.safeParse(body);

        if (!validateVehicle.success) {
            const { errors } = validateVehicle.error;

            return NextResponse.json({ message: errors.map(error => error.message).join(", ") }, { status: 400 });
        }

        const existedVehicle = await prisma.vehicle.findFirst({
            where: {
                plateNumber: body.plateNumber
            },
        });

        if (existedVehicle) {
            return NextResponse.json({
                message: "Ya existe un vehículo con el mismo número de placa.",
            }, { status: 400 });
        }

        await prisma.vehicle.create({ data: body });

        return NextResponse.json({
            message: "Nuevo vehículo creado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
