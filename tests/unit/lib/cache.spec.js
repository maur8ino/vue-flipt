import { Cache } from "@/lib/cache";

describe("Cache", () => {
  it("should create a new instance with methods", () => {
    const cache = new Cache();

    expect(cache).toBeDefined();
    expect(cache.addToCache).toBeDefined();
    expect(cache.getCached).toBeDefined();
  });

  it("should add a request to the cache", () => {
    const cache = new Cache();
    const request = {
      requestId: "e38347fe-0fa2-4ff4-9f0b-f5e5174abfbb",
      entityId: "entity-1",
      requestContext: { value1: "red", value2: "green" },
      match: true,
      flagKey: "test-flag",
      segmentKey: "test-segment",
      timestamp: "2020-11-24T22:33:33.324190Z",
      value: "blue",
      requestDurationMillis: 18.2473,
    };
    cache.addToCache(request);

    expect(cache._map.size).toBe(1);
  });
});
