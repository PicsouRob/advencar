import { NextResponse } from "next/server";
import { z } from "zod";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";

const idSchema = z.number({
    required_error: "El id es obligatorio.",
}).int({
    message: "El id es debe ser un número entero.",
}).positive({
    message: "El id debe ser positivo.",
});

export async function DELETE(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN"]);

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

        await prisma.employee.delete({ where: { id } });

        return NextResponse.json({
            message: "Empleado eliminado correctamente."
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message
        }, { status: 500 });
    }
};
