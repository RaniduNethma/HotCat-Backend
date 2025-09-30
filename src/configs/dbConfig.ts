import { PrismaClient } from "@prisma/client";

let DB: PrismaClient;

if (process.env.NODE_ENV === "production") {
  DB = new PrismaClient();
}
else {
  if (!(global as any).DB) {
    (global as any).DB = new PrismaClient();
  }

  DB = (global as any).DB;
}

export default DB;
