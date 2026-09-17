import { sayHello } from "../src/sayHello";

test("sayHello() success", () => {
  expect(sayHello("Rifky")).toBe("Hello Rifky");
});

test.failing("sayHello() error", () => {
  sayHello(null);
});

test("sayHello() error matcher", () => {
  expect(() => sayHello(null)).toThrow();
});
