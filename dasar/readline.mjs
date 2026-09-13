import process from "process";
import readline from "readline";

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

input.question("Siapa Nama Anda? : ", (name) => {
  console.info(`Halo ${name}`);
  input.close();
});
