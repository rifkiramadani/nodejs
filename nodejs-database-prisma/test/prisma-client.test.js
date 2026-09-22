import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

describe("Prisma Client", () => {
  it("Should be able to connect to database", async () => {
    const dbUrl = new URL(process.env.DATABASE_URL);

    const adapter = new PrismaMariaDb({
      host: "127.0.0.1",
      port: parseInt(dbUrl.port || "3306"),
      user: dbUrl.username,
      password: dbUrl.password || undefined,
      database: dbUrl.pathname.splice(1),
    });

    const prisma = new PrismaClient({
      adapter,
      errorFormat: "pretty",
      log: ["info", "warn", "error", "query"],
    });

    await prisma.$connect();

    //do something

    await prisma.$disconnect();
  });
});
