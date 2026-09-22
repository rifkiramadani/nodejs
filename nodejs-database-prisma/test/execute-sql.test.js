import { prismaClient } from "../src/prisma-client";

describe("Describe Prisma Client", () => {
  it("Should Be Able To execute SQL", async () => {
    const id = 1;
    const name = "Muhammad Rifky Ramadani";

    const impacted =
      await prismaClient.$executeRaw`INSERT INTO sample(id, name) VALUES (${id}, ${name})`;
    expect(impacted).toBe(1);
  });
});
