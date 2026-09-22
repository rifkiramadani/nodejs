import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should can create and select fields", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "lorem",
        name: "Lorem Ipsum",
        email: "loremipsum@gmail.com",
        phone: "0127329482367",
      },
      select: {
        id: true,
        name: true,
      },
    });
    expect(customer.id).toBe("lorem");
    expect(customer.name).toBe("Lorem Ipsum");
    expect(customer.email).toBeUndefined();
    expect(customer.phone).toBeUndefined();
  });

  it("should can select fields", async () => {
    const customers = await prismaClient.customer.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    for (let customer of customers) {
      expect(customer.id).toBeDefined();
      expect(customer.name).toBeDefined();
      expect(customer.email).toBeUndefined();
      expect(customer.phone).toBeUndefined();
    }
  });
});

afterAll(() => {
  prismaClient.$disconnect();
});
