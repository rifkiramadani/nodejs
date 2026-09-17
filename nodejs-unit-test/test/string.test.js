test("string", () => {
  const name = "Muhammad Rifky Ramadani";

  expect(name).toBe("Muhammad Rifky Ramadani");
  expect(name).toMatch(/ammad/);
});
