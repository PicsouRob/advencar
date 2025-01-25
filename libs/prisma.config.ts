/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import { neonConfig, Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

import ws from 'ws';
neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

// declare global {
//     interface GlobalThis {
//         prisma: PrismaClient | undefined
//     }
// }

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = (global as any).prisma ?? new PrismaClient({ adapter });

if(process.env.NODE_ENV === 'production') (global as any).prisma = prisma;

export { prisma };