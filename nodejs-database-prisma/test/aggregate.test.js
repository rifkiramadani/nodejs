import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("should be able to do query aggregate", async () => {
    const products = await prismaClient.product.aggregate({
      _max: {
        price: true,
      },
      _min: {
        price: true,
      },
      _avg: {
        price: true,
      },
    });
    console.info(products);
  });

  it("should be able to do query aggregate with group by", async () => {
    const products = await prismaClient.product.groupBy({
      by: ["category"],
      _max: {
        price: true,
      },
      _min: {
        price: true,
      },
      _avg: {
        price: true,
      },
    });
    console.info(products);
  });

  it("should be able to do query aggregate with group by and having", async () => {
    const products = await prismaClient.product.groupBy({
      by: ["category"],
      _max: {
        price: true,
      },
      _min: {
        price: true,
      },
      _avg: {
        price: true,
      },
      having: {
        price: {
          _avg: {
            gt: 3000,
          },
        },
      },
    });
    console.info(products);
  });
});

afterAll(() => {
  prismaClient.$disconnect();
});
