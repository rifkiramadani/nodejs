import supertest from "supertest";
import {
  createManyTestContact,
  createTestAddress,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContact,
  removeTestUser,
} from "./test-util";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can create new address", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "indonesia",
        postal_code: "12345",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("12345");
  });

  it("should reject if address request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact address is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + (testContact.id + 9999) + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "indonesia",
        postal_code: "12345",
      });

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can get contact addresses", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test ");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("indonesia");
    expect(result.body.data.postal_code).toBe("12345");
  });

  it("should reject if contact id address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(
        "/api/contacts/" +
          testContact.id +
          99999 +
          "/addresses/" +
          testAddress.id,
      )
      .set("Authorization", "test ");

    expect(result.status).toBe(404);
  });

  it("should reject if contact address id is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(
        "/api/contacts/" +
          testContact.id +
          "/addresses/" +
          testAddress.id +
          99999,
      )
      .set("Authorization", "test ");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can update contact address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "Jalan test baru",
        city: "Kota test baru",
        province: "Provinsi test baru",
        country: "Negara test baru",
        postal_code: "1122334455",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("Jalan test baru");
    expect(result.body.data.city).toBe("Kota test baru");
    expect(result.body.data.province).toBe("Provinsi test baru");
    expect(result.body.data.country).toBe("Negara test baru");
    expect(result.body.data.postal_code).toBe("1122334455");
  });

  it("should reject if contact address request is not valid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test")
      .send({
        street: "Jalan test baru",
        city: "Kota test baru",
        province: "Provinsi test baru",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
  });

  it("should reject if contact addressId is not found when update", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        "/api/contacts/" +
          testContact.id +
          "/addresses/" +
          testAddress.id +
          99999,
      )
      .set("Authorization", "test")
      .send({
        street: "Jalan test baru",
        city: "Kota test baru",
        province: "Provinsi test baru",
        country: "Negara test baru",
        postal_code: "1122334455",
      });

    logger.info(result.body);

    expect(result.status).toBe(404);
  });

  it("should reject if contactId address is not found when update", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        "/api/contacts/" +
          testContact.id +
          9999 +
          "/addresses/" +
          testAddress.id,
      )
      .set("Authorization", "test")
      .send({
        street: "Jalan test baru",
        city: "Kota test baru",
        province: "Provinsi test baru",
        country: "Negara test baru",
        postal_code: "1122334455",
      });

    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can remove contact address", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + testAddress.id,
      )
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it("reject if contact addressId is not found when delete", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" +
          testContact.id +
          "/addresses/" +
          testAddress.id +
          99999,
      )
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(404);
  });

  it("reject if contactId address is not found when delete", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" +
          testContact.id +
          9999 +
          "/addresses/" +
          testAddress.id,
      )
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can list addresses", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it("reject if contactId is not found when listing address", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + 9999 + "/addresses")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

afterAll(() => {
  prismaClient.$disconnect();
});
