function samplePromise() {
  return Promise.resolve("Rifky");
}

const name = await samplePromise();
console.info(name);
