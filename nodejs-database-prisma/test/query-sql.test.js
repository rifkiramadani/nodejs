import { prismaClient } from "../src/prisma-client";

describe("Describe Prisma Client", () => {
  it("Should Be Able To execute SQL", async () => {
    const id = "1";

    const samples =
      await prismaClient.$queryRaw`SELECT * FROM sample WHERE id = ${id}`;

    for (const sample of samples) {
      console.info(`Result sample id : ${sample.id} and name ${sample.name}`);
    }
  });
});
