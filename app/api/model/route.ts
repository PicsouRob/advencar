import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../verifyTokenAndRole";

export async function GET(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN", "ASSISTANT"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const models = await prisma.model.findMany({
            include: { brand: true }
        });

        return NextResponse.json({
            data: models
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
