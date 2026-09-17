test("test toBe", () => {
  const name = "Muhammad Rifky Ramadani";
  const hello = `Hello ${name}`;

  expect(hello).toBe("Hello Muhammad Rifky Ramadani");
});

test("to toEqual", () => {
  let person = { id: "rifky" };
  Object.assign(person, { name: "Muhammad Rifky Ramadani" });

  expect(person).toEqual({ id: "rifky", name: "Muhammad Rifky Ramadani" });
});
