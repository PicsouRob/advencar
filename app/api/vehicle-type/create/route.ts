import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { vehicleTypeFormSchema } from "@/utils/form/vehicle-type";

export async function POST(req: Request) {
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

        const existedVehicleType = await prisma.vehicleType.findFirst({
            where: { description: body.description },
        });

        if (existedVehicleType) {
            return NextResponse.json({
                message: "Ya existe un tipo de vehículo con el mismo nombre.",
            }, { status: 400 });
        }

        await prisma.vehicleType.create({ data: body });

        return NextResponse.json({
            message: "Nuevo tipo de vehículo creado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
