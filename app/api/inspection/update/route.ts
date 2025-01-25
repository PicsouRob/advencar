import { NextResponse } from "next/server";

import { verifyTokenAndRole } from "../../verifyTokenAndRole";
import { prisma } from "@/libs/prisma.config";
import { inspectionFormSchema } from "@/utils/form/inspections";

export async function PUT(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN", "ASSISTANT"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const body = await req.json();

        const validateInspection = inspectionFormSchema.safeParse(body);

        if (!validateInspection.success) {
            const { errors } = validateInspection.error;

            return NextResponse.json({ errors }, { status: 400 });
        }

        await prisma.inspection.update({
            where: { id: body.id },
            data: body,
        });

        return NextResponse.json({
            message: "Inspección actualizada con éxito.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
