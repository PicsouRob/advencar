import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { modelFormSchema } from "@/utils/form/models";

export async function PUT(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateModel = modelFormSchema.safeParse(body);

        if (!validateModel.success) {
            const { errors } = validateModel.error;

            return NextResponse.json({ errors }, { status: 400 });
        }

        await prisma.model.update({
            where: { id: body.id },
            data: body,
        });

        return NextResponse.json({
            message: "Modelo actualizado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
