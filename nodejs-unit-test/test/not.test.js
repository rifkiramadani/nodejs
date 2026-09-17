test("string.not", () => {
  const name = "Muhammad Rifky Ramadani";

  expect(name).not.toBe("putro");
  expect(name).not.toEqual("putro");
  expect(name).not.toMatch("/putro/");
});

test("number.not", () => {
  const value = 2 + 2;

  expect(value).not.toBeGreaterThan(6);
  expect(value).not.toBeLessThan(3);
  expect(value).not.toBe(10);
});
