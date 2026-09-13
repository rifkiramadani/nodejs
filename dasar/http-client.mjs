import https from "https";

const endpoint = "https://eom5w5tm3nk010w.m.pipedream.net";
const request = https.request(
  endpoint,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  (response) => {
    response.addListener("data", (data) => {
      console.info(`Recieve data ${data.toString()}`);
    });
  },
);

const body = JSON.stringify({
  firstName: "Rifky",
  lastName: "Ramadani",
});

request.write(body);
request.end();
