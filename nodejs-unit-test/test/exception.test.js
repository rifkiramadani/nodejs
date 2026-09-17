import { callMe, MyException } from "../src/exception";

test("exception", () => {
  expect(() => callMe("Rifky")).toThrow();
  expect(() => callMe("Rifky")).toThrow(MyException);
  expect(() => callMe("Rifky")).toThrow("Ups My Exception Happens");
});

test("exception not happens", () => {
  expect(callMe("Putro")).toBe("OK");
});
