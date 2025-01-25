import { PrismaClient } from "@prisma/client";

declare global {
    declare namespace globalThis {
        const prisma: PrismaClient | undefined;
    }
}

export {};