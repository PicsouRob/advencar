import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
 
export async function verifyTokenAndRole(
    req: Request, authorizedRole: string[] = ["ADMIN"]
) {
    const auttHeader = req.headers.get("Authorization");

    if (!auttHeader || !auttHeader.startsWith("Bearer ")) { 
        return NextResponse.json({
            message: "No se proporciono un token de autenticación."
        }, { status: 401 });
    }

    const token = auttHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token, process.env.JWT_USER_ID_SECRET as string
        ) as { id: number, role: string };

        if (!authorizedRole.includes(decoded.role)) {
            return NextResponse.json({
                message: "No tiene permisos para acceder a esta ruta.",
            }, { status: 403 });
        }

        return decoded;
    } catch (error) {
        console.error("Eroor:", error);

        return NextResponse.json({
            message: "Token inválido o vencido.",
        }, { status: 401 });
    }
}
