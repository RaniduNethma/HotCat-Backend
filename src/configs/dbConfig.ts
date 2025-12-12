import { env } from "./envConfig.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

const DB = new PrismaClient({ adapter });

export default DB;

// Launch Prisma Studio
// npx prisma studio --config ./prisma.config.ts
