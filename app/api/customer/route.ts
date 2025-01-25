import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma.config";
import { verifyTokenAndRole } from "../verifyTokenAndRole";

export async function GET(req: Request) {
    const auth = await verifyTokenAndRole(req, ["ADMIN", "ASSISTANT"]);

    if (auth instanceof NextResponse) {
        return auth;
    }

    try {
        const customers = await prisma.customer.findMany();

        return NextResponse.json({
            data: customers
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
