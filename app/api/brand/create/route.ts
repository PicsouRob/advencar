import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { brandFormSchema } from "@/utils/form/brands";

export async function POST(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateBrand = brandFormSchema.safeParse(body);

        if (!validateBrand.success) {
            const { errors } = validateBrand.error;

            return NextResponse.json({
                message: errors.map(error => error.message).join(", ")
            }, { status: 400 });
        }

        const existedBrand = await prisma.brand.findFirst({
            where: { description: body.description },
        });

        if (existedBrand) {
            return NextResponse.json({
                message: "Ya existe una marca con el mismo nombre.",
            }, { status: 400 });
        }

        await prisma.brand.create({ data: body });

        return NextResponse.json({
            message: "Nueva marca creada con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
