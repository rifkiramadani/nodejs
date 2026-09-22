import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should can create many records", async () => {
    const { count } = await prismaClient.customer.createMany({
      data: [
        {
          id: "5",
          name: "putro",
          email: "putro@gmail.com",
          phone: "238746123",
        },
        {
          id: "6",
          name: "purot",
          email: "purot@gmail.com",
          phone: "238974562",
        },
      ],
    });

    expect(count).toBe(2);
  });

  it("should can update many records", async () => {
    const { count } = await prismaClient.customer.updateMany({
      data: {
        email: "putro000@gmail.com",
      },
      where: {
        name: "putro",
      },
    });
    expect(count).toBe(1);
  });

  it("should can delete many records", async () => {
    const { count } = await prismaClient.customer.deleteMany({
      where: {
        name: "Tidak ada",
      },
    });
    expect(count).toBe(0);
  });

  it("should be able to read many records", async () => {
    const customers = await prismaClient.customer.findMany({});
    console.info(customers);
    expect(customers.length).toBe(6);
  });
});

afterAll(() => {
  prismaClient.$disconnect();
});
