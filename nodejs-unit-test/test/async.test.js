import { sayHelloAsync } from "../src/async";

test("test async function", async () => {
  const result = await sayHelloAsync("Rifky");
  expect(result).toBe("Hello Rifky");
});

test("test async matchers", async () => {
  await expect(sayHelloAsync("Rifky")).resolves.toBe("Hello Rifky");
  await expect(sayHelloAsync()).rejects.toBe("Name is empty");
});
