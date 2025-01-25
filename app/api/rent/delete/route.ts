import { NextResponse } from "next/server";
import { z } from "zod";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";

const idSchema = z.number({
    message: "El id del empleado debe ser un número."
}).int({
    message: "El id del empleado debe ser un número entero."
}).positive({
    message: "El id del empleado debe ser positivo."
});

export async function DELETE(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ASSISTANT", "ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const id: number = Number(new URL(req.url).searchParams.get("id"));
        const validateId = idSchema.safeParse(id);

        if (!validateId.success) {
            const { errors } = validateId.error;
            console.log("errors: ", errors);

            return NextResponse.json({
                error: errors.map(error => error.message).join(", ")
            }, { status: 400 });
        }

        const existedRent = await prisma.rent.findUnique({
            where: { id },
        });

        if (!existedRent) {
            return NextResponse.json({
                message: "Alquiler no existe.",
            }, { status: 400 });
        }

        await prisma.rent.delete({ where: { id }});

        // update vehicle status
        await prisma.vehicle.update({
            where: { id: existedRent.vehicleId },
            data: { status: "Disponible" },
        });

        return NextResponse.json({
            message: "Alquiler eliminado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
