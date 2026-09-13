import dns from "dns/promises";

const address = await dns.lookup("www.sumatifummatanwahidah.com");

console.info(address.family);
console.info(address.address);
