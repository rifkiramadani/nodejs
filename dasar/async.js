function samplePromise() {
  return Promise.resolve("Rifky");
}

async function run() {
  const name = await samplePromise();
  console.info(name);
}
