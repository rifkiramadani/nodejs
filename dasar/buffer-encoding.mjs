const buffer = Buffer.from("Muhammad Rifky Ramadani", "utf-8");

console.info(buffer.toString());
console.info(buffer.toString("hex"));
console.info(buffer.toString("base64"));

const bufferBase64 = Buffer.from("TXVoYW1tYWQgUmlma3kgUmFtYWRhbmk=", "base64");
console.info(bufferBase64.toString("utf8"));
