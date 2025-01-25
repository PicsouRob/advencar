import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { modelFormSchema } from "@/utils/form/models";

export async function POST(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateModel = modelFormSchema.safeParse(body);

        if (!validateModel.success) {
            const { errors } = validateModel.error;

            return NextResponse.json({
                message: errors.map(error => error.message).join(", ")
            }, { status: 400 });
        }

        const existedModel = await prisma.model.findFirst({
            where: { description: body.description },
        });

        if (existedModel && existedModel.brandId === body.brandId) {
            return NextResponse.json({
                message: "Ya existe un modelo con el mismo nombre.",
            }, { status: 400 });
        }

        await prisma.model.create({ data: body });

        return NextResponse.json({
            message: "Nuevo modelo creado con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
