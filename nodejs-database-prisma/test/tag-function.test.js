function tagFunction(array, ...args) {
  console.info(array);
  console.info(...args);
}

test("tag function", () => {
  const name = "Rifky";
  const lastName = "Ramadani";

  tagFunction`Hello ${name} ${lastName}!, How Are You?`;
  tagFunction`Bye ${name} ${lastName}!, See You Later`;
});

test("tag function sql", () => {
  const name = "Rifky'; DROP table users;";
  const age = 17;

  tagFunction`SELECT * FROM users WHERE name = ${name} AND age ${age}`;
});
