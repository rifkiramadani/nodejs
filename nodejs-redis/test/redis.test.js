import Redis from "ioredis";

describe("nodejs redis", () => {
  let redis = null;

  beforeEach(async () => {
    redis = new Redis({
      host: "localhost",
      port: 6379,
      db: 0,
    });

    await redis.flushdb();
  });

  afterEach(async () => {
    await redis.quit();
  });

  it("should can ping", async () => {
    const pong = await redis.ping();
    expect(pong).toBe("PONG");
  });

  it("should support string", async () => {
    await redis.setex("name", 2, "Rifky");
    let name = await redis.get("name");
    expect(name).toBe("Rifky");

    await new Promise((resolve) => setTimeout(resolve, 3000));
    name = await redis.get("name");
    expect(name).toBeNull();
  });

  it("should support list", async () => {
    await redis.rpush("names", "Muhammad");
    await redis.rpush("names", "Rifky");
    await redis.rpush("names", "Ramadani");

    expect(await redis.llen("names")).toBe(3);

    const names = await redis.lrange("names", 0, -1);
    expect(names).toEqual(["Muhammad", "Rifky", "Ramadani"]);

    expect(await redis.lpop("names")).toBe("Muhammad");
    expect(await redis.rpop("names")).toBe("Ramadani");

    expect(await redis.llen("names")).toBe(1);

    await redis.del("names");
  });

  it("should support set", async () => {
    await redis.sadd("names", "Muhammad");
    await redis.sadd("names", "Muhammad");
    await redis.sadd("names", "Rifky");
    await redis.sadd("names", "Rifky");
    await redis.sadd("names", "Ramadani");
    await redis.sadd("names", "Ramadani");

    expect(await redis.scard("names")).toBe(3);

    const names = await redis.smembers("names");
    expect(names).toEqual(["Muhammad", "Rifky", "Ramadani"]);

    await redis.del("names");
  });

  it("should support sorted set", async () => {
    await redis.zadd("names", 100, "Rifky");
    await redis.zadd("names", 85, "Putro");
    await redis.zadd("names", 95, "Putra");

    expect(await redis.zcard("names")).toBe(3);

    const names = await redis.zrange("names", 0, -1);
    expect(names).toEqual(["Putro", "Putra", "Rifky"]);

    expect(await redis.zpopmax("names")).toEqual(["Rifky", "100"]);
    expect(await redis.zpopmax("names")).toEqual(["Putra", "95"]);
    expect(await redis.zpopmax("names")).toEqual(["Putro", "85"]);

    await redis.del("names");
  });

  it("should support hash", async () => {
    await redis.hset("user:1", {
      id: "1",
      name: "Rifky",
      email: "rifky@gmail.com",
    });

    const user = await redis.hgetall("user:1");

    expect(user).toEqual({
      id: "1",
      name: "Rifky",
      email: "rifky@gmail.com",
    });

    await redis.del("user:1");
  });

  it("should support geo point", async () => {
    await redis.geoadd("sellers", 106.953501, -6.178744, "Toko A");
    await redis.geoadd("sellers", 106.954989, -6.178624, "Toko B");

    const distance = await redis.geodist("sellers", "Toko A", "Toko B", "KM");
    expect(distance).toBe(String(0.1654));

    const result = await redis.geosearch(
      "sellers",
      "fromlonlat",
      106.951379,
      -6.177472,
      "byradius",
      5,
      "km",
    );
    expect(result).toEqual(["Toko A", "Toko B"]);
  });

  it("should support hyper log log", async () => {
    await redis.pfadd("visitors", "Muhammad", "Rifky", "Ramadani");
    await redis.pfadd("visitors", "Putro", "Rifky", "Purot");
    await redis.pfadd("visitors", "Putra", "Rifky", "Ramadani");

    const total = await redis.pfcount("visitors");
    expect(total).toBe(6);
  });

  it("should support pipeline", async () => {
    const pipeline = redis.pipeline();

    pipeline.setex("name", 2, "Muhammad Rifky Ramadani");
    pipeline.setex("address", 2, "Indonesia");

    await pipeline.exec();

    expect(await redis.get("name")).toBe("Muhammad Rifky Ramadani");
    expect(await redis.get("address")).toBe("Indonesia");
  });

  it("should support transaction", async () => {
    const transaction = redis.multi();

    transaction.setex("name", 2, "Muhammad Rifky Ramadani");
    transaction.setex("address", 2, "Indonesia");

    await transaction.exec();

    expect(await redis.get("name")).toBe("Muhammad Rifky Ramadani");
    expect(await redis.get("address")).toBe("Indonesia");
  });

  it("should can consumer stream", async () => {
    for (let i = 0; i < 10; i++) {
      await redis.xadd(
        "members",
        "*",
        "name",
        `Rifky ${i}`,
        "address",
        "Indonesia",
      );
    }

    await redis.xgroup("CREATE", "members", "group-1", "0", "MKSTREAM");
    await redis.xgroup("CREATECONSUMER", "members", "group-1", "consumer-1");
    await redis.xgroup("CREATECONSUMER", "members", "group-1", "consumer-2");

    const result = await redis.xreadgroup(
      "GROUP",
      "group-1",
      "consumer-1",
      "COUNT",
      2,
      "BLOCK",
      3000,
      "STREAMS",
      "members",
      ">",
    );
    expect(result).not.toBeNull();
    console.info(JSON.stringify(result, null, 2));
  });

  it("should can subscribe to pubsub", async () => {
    redis.subscribe("channel-1");

    redis.on("message", (channel, message) => {
        console.info(`Recieve message from channel ${channel} with message ${message}`)
    })

    await new Promise(resolve => setTimeout(resolve, 60000))
  }, 60000);

  it("should can publish to pubsub", async () => {
    for(let i =0; i < 10; i++) {
        await redis.publish("channel-1", `Hello World ${i}`)
    }
  })
});
