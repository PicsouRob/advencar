import { PrismaClient } from '@prisma/client';
import { neonConfig, Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

import ws from 'ws';
neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

// declare global {
//     var __db: PrismaClient | undefined
// }

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = global.prisma || new PrismaClient({ adapter });

if(process.env.NODE_ENV === 'production') global.prisma = prisma;

export { prisma };