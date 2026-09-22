import { prismaClient } from "../src/prisma-client";

describe("Prisma Client", () => {
  it("it should can insert and include", async () => {
    const comment = await prismaClient.comment.create({
      data: {
        customer_id: "1",
        title: "Insert Comment 1",
        description: "Sample Insert Comment 1",
      },
      include: {
        customer: true,
      },
    });
    console.info(comment);
  });

  it("should can insert many and include", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "9",
        name: "Testing",
        email: "testing@gmail.com",
        phone: "897478236423",
        comment: {
          createMany: {
            data: [
              {
                title: "Insert Comment 2",
                description: "Sample Insert Comment 2",
              },
              {
                title: "Insert Comment 3",
                description: "Sample Insert Comment 3",
              },
            ],
          },
        },
      },
      include: {
        comment: true,
      },
    });
    console.info(customer);
  });

  it("should can find many with filter relation", async () => {
    const customer = await prismaClient.customer.findMany({
      where: {
        comment: {
          some: {
            title: {
              contains: "Comment",
            },
          },
        },
      },
      include: {
        comment: true,
      },
    });
    console.info(JSON.stringify(customer));
  });
});

afterAll(() => {
  prismaClient.$disconnect();
});
