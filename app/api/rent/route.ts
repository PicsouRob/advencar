import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../verifyTokenAndRole";

export async function GET(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ASSISTANT", "ADMIN"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const rents = await prisma.rent.findMany({
            include: { vehicle: true, customer: true, employee: true },
        });

        return NextResponse.json({
            data: rents
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
