import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should can create one to one relation", async () => {
    const wallet = await prismaClient.wallet.create({
      data: {
        id: "1",
        balance: 100000,
        customer_id: "1",
      },
      include: {
        Customer: true,
      },
    });
    console.info(wallet);
  });

  it("should can create one to one with relation", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "8",
        name: "Ahmad Fadhila",
        email: "fadhil@gmail.com",
        phone: "089074392874",
        wallet: {
          create: {
            id: "2",
            balance: 200000,
          },
        },
      },
      include: {
        wallet: true,
      },
    });
    console.info(customer);
  });

  it("should can find one to one with relation", async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "1",
      },
      include: {
        wallet: true,
      },
    });
    console.info(customer);
  });

  it("should can find one to one with relation filter", async () => {
    const customer = await prismaClient.customer.findMany({
      where: {
        wallet: {
          isNot: null,
        },
      },
      include: {
        wallet: true,
      },
    });
    console.info(customer);
  });
});

afterAll(() => {
  prismaClient.$disconnect();
});
