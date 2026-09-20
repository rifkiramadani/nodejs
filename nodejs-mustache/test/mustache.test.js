import Mustache from "mustache";
import fs from "fs/promises";

test("Menggunakan Mustache", () => {
  const data = Mustache.render("Hello {{name}}", { name: "Rifky" });
  expect(data).toBe("Hello Rifky");
});

test("Menggunakan Mustache Cache", () => {
  Mustache.parse("Hello {{name}}");

  const data = Mustache.render("Hello {{name}}", { name: "Rifky" });
  expect(data).toBe("Hello Rifky");
});

test("Tags", () => {
  const data = Mustache.render("Hello {{name}}, My Hobby Is {{{hobby}}}", {
    name: "Rifky",
    hobby: "<b>Programming</b>",
  });
  expect(data).toBe("Hello Rifky, My Hobby Is <b>Programming</b>");
});

test("Nested Object", () => {
  const data = Mustache.render("Hello {{person.name}}", {
    person: {
      name: "Rifky",
    },
  });
  expect(data).toBe("Hello Rifky");
});

test("Mustache File", async () => {
  const helloTemplate = await fs
    .readFile("./templates/hello.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    title: "Muhammad Rifky Ramadani",
  });
  console.info(data);
  expect(data).toContain("Muhammad Rifky Ramadani");
});

test("Mustache Sections Not Show", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});
  console.info(data);
  expect(data).not.toContain("Hello Person");
});

test("Mustache Sections Show", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    person: {
      name: "Muhammad Rifky Ramadani",
    },
  });
  console.info(data);
  expect(data).toContain("Hello Person");
});

test("Mustache Sections Data", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    person: {
      name: "Muhammad Rifky Ramadani",
    },
  });
  console.info(data);
  expect(data).toContain("Hello Person Muhammad Rifky Ramadani!");
});

test("Mustache Inverted Sections", async () => {
  const helloTemplate = await fs
    .readFile("./templates/person.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});
  console.info(data);
  expect(data).toContain("Hello Guest");
});

test("List", async () => {
  const helloTemplate = await fs
    .readFile("./templates/hobbies.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    hobbies: ["Coding", "Studying", "Reading"],
  });
  console.info(data);
  expect(data).toContain("Coding");
  expect(data).toContain("Studying");
  expect(data).toContain("Reading");
});

test("List Object", async () => {
  const helloTemplate = await fs
    .readFile("./templates/students.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    students: [
      {
        name: "Rifky",
        value: 100,
      },
      {
        name: "Putro",
        value: 95,
      },
    ],
  });
  console.info(data);
  expect(data).toContain("Rifky");
  expect(data).toContain("Putro");
  expect(data).toContain("100");
  expect(data).toContain("95");
});

test("Functions", async () => {
  const parameter = {
    name: "Rifky",
    upper: () => {
      return (text, render) => {
        return render(text).toUpperCase();
      };
    },
  };

  const data = Mustache.render(
    "Hello, {{#upper}}{{name}}{{/upper}}",
    parameter,
  );
  console.info(data);
  expect(data).toContain("Hello, RIFKY");
});

test("Comment", async () => {
  const helloTemplate = await fs
    .readFile("./templates/comment.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { title: "Rifky" });
  console.info(data);
  expect(data).toContain("Rifky");
  expect(data).not.toContain("Ini Komentar");
});

test("Partials", async () => {
  const contentTemplate = await fs
    .readFile("./templates/content.mustache")
    .then((data) => data.toString());
  const headerTemplate = await fs
    .readFile("./templates/header.mustache")
    .then((data) => data.toString());
  const footerTemplate = await fs
    .readFile("./templates/footer.mustache")
    .then((data) => data.toString());

  const data = Mustache.render(
    contentTemplate,
    {
      title: "Muhammad Rifky Ramadani",
      content: "lorem ipsum dolor sit amet",
    },
    {
      header: headerTemplate,
      footer: footerTemplate,
    },
  );

  console.info(data);
  expect(data).toContain("Muhammad Rifky Ramadani");
  expect(data).toContain("lorem ipsum dolor sit amet");
  expect(data).toContain("Powered By Muhammad Rifky Ramadani");
});
