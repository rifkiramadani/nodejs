import * as axios from "axios";
import * as fs from "node:fs";

describe("HTTP Client", () => {
  it("should be supported by axios", async () => {
    const httpClient = axios.create({
      baseURL: "https://eom5w5tm3nk010w.m.pipedream.net",
      timeout: 5000,
    });
    expect(httpClient).toBeDefined();
  });
});

describe("HTTP Method", () => {
  const httpClient = axios.create({
    baseURL: "https://eom5w5tm3nk010w.m.pipedream.net",
    timeout: 10000,
  });

  httpClient.interceptors.request.use(
    (config) => {
      console.info(`Send Request to ${config.baseURL}${config.url}`);
      return config;
    },
    (error) => {
      console.error(`Request error : ${error.message}`);
      return Promise.reject(error);
    },
    {
      synchronous: true,
    },
  );

  httpClient.interceptors.response.use(
    async (response) => {
      const fullUrl = response.config.baseURL + response.config.url;
      const body = JSON.stringify(response.data);
      console.info(`Recieve response from ${fullUrl} with body ${body}`);
      return response;
    },
    async (error) => {
      console.error(`Response Error : ${error}`);
      return Promise.reject(error);
    },
    {
      synchronous: false,
    },
  );

  it("should be supported http GET method ", async () => {
    const response = await httpClient.get("/");
    expect(response.status).toBe(200);
  }, 10000);

  it("should be supported http GET method with config", async () => {
    const response = await httpClient.get("/", {
      params: {
        name: "Rifky",
      },
      headers: {
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  }, 10000);

  it("should be supported POST with JSON request body", async () => {
    const json = {
      username: "rifky",
      password: "rahasia",
    };
    const response = await httpClient.post("/", json, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
  }, 10000);

  it("should be supported POST with TEXT request body", async () => {
    const text = "Muhammad Rifky Ramadani";
    const response = await httpClient.post("/", text, {
      headers: {
        "Content-Type": "text/plain",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  }, 10000);

  it("should be supported POST with FORM request body", async () => {
    const json = {
      username: "rifky",
      password: "rahasia",
    };
    const response = await httpClient.post("/", json, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  }, 10000);

  it("should be supported POST with MULTIPART request body", async () => {
    const data = fs.readFileSync("image.png");

    const form = new FormData();
    form.append("username", "rifky");
    form.append("password", "rahasia");
    form.append("file", new Blob(data), "image.png");

    const response = await httpClient.post("/", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.data.success).toBe(true);
  }, 10000);
});

describe("Error Handler", () => {
  const httpClient = axios.create({
    baseURL: "https://www.youtube.com/",
    timeout: 10000,
  });

  it("should error if 404 not found without validate status", async () => {
    try {
      await httpClient.get("/not-found");
    } catch (error) {
      console.error(error);
      expect(error.response.status).toBe(404);
    }
  });
});

describe("Error Handler 2", () => {
  const httpClient = axios.create({
    baseURL: "https://www.youtube.com/",
    timeout: 10000,
    validateStatus: (status) => {
      return status < 500;
    },
  });

  it("should error if 404 not found with validate status", async () => {
    const response = await httpClient.get("/halaman-ini-pasti-tidak-ada-12345");
    expect(response.status).toBe(404);
  });
});
