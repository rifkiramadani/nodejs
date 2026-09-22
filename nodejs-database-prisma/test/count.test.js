import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should can count", async () => {
    const total = await prismaClient.customer.count({
      where: {
        name: "Rifky",
      },
    });
    expect(total).toBe(2);
  });
});

afterAll(() => {
  prismaClient.$disconnect();
});
