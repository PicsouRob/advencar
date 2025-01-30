import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { brandFormSchema } from "@/utils/form/brands";

export async function PUT(req: Request) {
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

        await prisma.brand.update({
            where: { id: body.id },
            data: body,
        });

        return NextResponse.json({
            message: "Marca actualizada con éxito.",
        }, { status: 200 });
    } catch (error) {
        console.log("error: ", error);

        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
