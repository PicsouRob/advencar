import { NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { sign as signJwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

import { prisma } from "@/libs/prisma.config";
import { Employee } from '@prisma/client';
import { UserSession } from '@/types/auth';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/signin",
        signOut: '/auth/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.JWT_USER_ID_SECRET,
    },
    debug: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProviders({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async authorize(credentials): Promise<any | null> {
                try {
                    if(!credentials ||!credentials.email || !credentials.password) {
                        throw new Error("Tus credenciales son obligatorias.");
                    }

                    const { email, password } = credentials;
                    const user = await prisma.employee.findUnique({
                        where: { email }
                    }) as Employee;

                    if(!user) {
                        throw new Error("No existe ningun empleado con ese correo electrónico.");
                    }

                    const isMatch = await bcrypt.compare(password, user.password);

                    if(!isMatch) {
                        throw new Error("Tu contraseña es incorrecta.");
                    }

                    const accessToken: string = signJwt({
                        id: user.id, role: user.role
                    }, process.env.JWT_USER_ID_SECRET as string, {
                        expiresIn: "30d"
                    });

                    return {
                        ...user,
                        message: "Empleado conectado con éxito.",
                        accessToken,
                    };
                } catch (error) {
                    console.error(`Error: ${(error as Error).message}`);

                    throw new Error((error as Error).message);
                }
            },
        }),
    ],
    cookies: {
        sessionToken: {
            name: "rentcar-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    callbacks: {
        async signIn() {
            return true;
        },

        async redirect({ baseUrl }: { baseUrl: string }) {
            return baseUrl
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: JWT, user: any }): Promise<JWT> {
            if (user) {
                token.role = user.role;
                token.accessToken = user.accessToken;
            }

            return token;
        },
        async session({ session, token }: UserSession) {
            if(session.user) {
                session.user = token;
            }

            return session;
        },
    },
};
