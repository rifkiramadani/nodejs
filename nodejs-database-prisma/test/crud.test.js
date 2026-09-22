import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should be able to create customer", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "1",
        name: "Muhammad Rifky Ramadani",
        email: "rifky@gmail.com",
        phone: "0812345678",
      },
    });

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Muhammad Rifky Ramadani");
    expect(customer.email).toBe("rifky@gmail.com");
    expect(customer.phone).toBe("0812345678");
  });

  it("should be able to update customer", async () => {
    const customer = await prismaClient.customer.update({
      data: {
        name: "M Rifky R",
      },
      where: {
        id: "1",
      },
    });

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("M Rifky R");
    expect(customer.email).toBe("rifky@gmail.com");
    expect(customer.phone).toBe("0812345678");
  });

  it("should be able to read customer", async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "1",
      },
    });

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("M Rifky R");
    expect(customer.email).toBe("rifky@gmail.com");
    expect(customer.phone).toBe("0812345678");
  });

  it("should be able to delete customer", async () => {
    const customer = await prismaClient.customer.delete({
      where: {
        id: "1",
      },
    });

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("M Rifky R");
    expect(customer.email).toBe("rifky@gmail.com");
    expect(customer.phone).toBe("0812345678");
  });
});

afterAll(async () => {
  await prismaClient.$disconnect();
});
