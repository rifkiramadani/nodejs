test("array string", () => {
  const names = ["Muhammad", "Rifky", "Ramadani"];
  expect(names).toEqual(["Muhammad", "Rifky", "Ramadani"]);
  expect(names).toContain("Rifky");
});

test("array object", () => {
  const persons = [
    { name: "Muhammad" },
    { name: "Rifky" },
    { name: "Ramadani" },
  ];
  expect(persons).toContainEqual({ name: "Rifky" });
  expect(persons).toEqual([
    { name: "Muhammad" },
    { name: "Rifky" },
    { name: "Ramadani" },
  ]);
});
