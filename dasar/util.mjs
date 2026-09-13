import util from "util";

const firstName = "rifky";
const lastName = "ramadani";

console.info(`Hello ${firstName} ${lastName}`);
console.info(util.format("hello %s %s", firstName, lastName));

const person = {
  firstName: "Rifky",
  lastName: "Ramadani",
};

console.info(`Person : ${JSON.stringify(person)}`);
console.info(util.format("person: %j", person));
