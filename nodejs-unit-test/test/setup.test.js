import { sum } from "../src/sum";

beforeAll(async () => {
  console.info("Before All");
});

afterAll(async () => {
  console.info("After All");
});

beforeEach(async () => {
  console.info("Before Each");
});

afterEach(async () => {
  console.info("After Each");
});

test("First Test", () => {
  expect(sum(10, 10)).toBe(20);
  console.info("First Test");
});

test("Second Test", () => {
  expect(sum(10, 10)).toBe(20);
  console.info("Second Test");
});
