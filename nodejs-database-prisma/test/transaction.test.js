import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should be can execute sequential transaction", async () => {
    const [rifky, ramadani] = await prismaClient.$transaction(
      [
        prismaClient.customer.create({
          data: {
            id: "1",
            name: "Rifky",
            email: "rifky@gmail.com",
            phone: "0812345678",
          },
        }),
        prismaClient.customer.create({
          data: {
            id: "2",
            name: "Ramadani",
            email: "ramadani@gmail.com",
            phone: "0887654321",
          },
        }),
      ],
      {
        timeout: 5,
      },
    );
    expect(rifky.name).toBe("Rifky");
    expect(ramadani.name).toBe("Ramadani");
  });

  it("should be can execute interactive transaction", async () => {
    const [rifky, ramadani] = await prismaClient.$transaction(
      async (prisma) => {
        const rifky = await prisma.customer.create({
          data: {
            id: "3",
            name: "Rifky",
            email: "rifky1@gmail.com",
            phone: "08123456788",
          },
        });
        const ramadani = await prisma.customer.create({
          data: {
            id: "4",
            name: "Ramadani",
            email: "ramadani1@gmail.com",
            phone: "08876543211",
          },
        });
        return [rifky, ramadani];
      },
      {
        timeout: 5,
      },
    );
    expect(rifky.name).toBe("Rifky");
    expect(ramadani.name).toBe("Ramadani");
  });
});

afterAll(() => {
  prismaClient.$disconnect();
});
