import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { logger } from "./logging.js";
import "dotenv/config";

const dbUrl = new URL(process.env.DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: "127.0.0.1",
  port: parseInt(dbUrl.port || "3306"),
  user: dbUrl.username,
  password: dbUrl.password || undefined,
  database: dbUrl.pathname.slice(1),
  connectionLimit: 5,
});

export const prismaClient = new PrismaClient({
  adapter,
  errorFormat: "pretty",
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$on("error", (e) => {
  logger.error(e);
});

prismaClient.$on("warn", (e) => {
  logger.warn(e);
});

prismaClient.$on("info", (e) => {
  logger.info(e);
});

prismaClient.$on("query", (e) => {
  logger.info(e);
});
