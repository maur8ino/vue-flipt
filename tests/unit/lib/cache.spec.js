import MockDate from "mockdate";

import { Cache, defaultCacheGracePeriod } from "@/lib/cache";

describe("Cache", () => {
  afterEach(() => {
    MockDate.reset();
  });

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

  it("should return the cached request if within the default grace period", () => {
    const cache = new Cache();
    const timestamp = "2020-11-25T19:00:00.000Z";
    const request = {
      requestId: "e38347fe-0fa2-4ff4-9f0b-f5e5174abfbb",
      entityId: "entity-1",
      requestContext: { value1: "red", value2: "green" },
      match: true,
      flagKey: "test-flag",
      segmentKey: "test-segment",
      timestamp,
      value: "blue",
      requestDurationMillis: 18.2473,
    };
    cache.addToCache(request);

    // Setting Date.now() to be 1ms before the end of the grace period
    MockDate.set(new Date(timestamp).valueOf() + defaultCacheGracePeriod - 1);
    expect(
      cache.getCached({
        entityId: "entity-1",
        flagKey: "test-flag",
        context: { value1: "red", value2: "green" },
      })
    ).toBeDefined();
  });

  it("should return undefined if out of the default grace period", () => {
    const cache = new Cache();
    const timestamp = "2020-11-25T19:00:00.000Z";
    const request = {
      requestId: "e38347fe-0fa2-4ff4-9f0b-f5e5174abfbb",
      entityId: "entity-1",
      requestContext: { value1: "red", value2: "green" },
      match: true,
      flagKey: "test-flag",
      segmentKey: "test-segment",
      timestamp,
      value: "blue",
      requestDurationMillis: 18.2473,
    };
    cache.addToCache(request);

    // Setting Date.now() to be 1ms after the end of the grace period
    MockDate.set(new Date(timestamp).valueOf() + defaultCacheGracePeriod + 1);
    expect(
      cache.getCached({
        entityId: "entity-1",
        flagKey: "test-flag",
        context: { value1: "red", value2: "green" },
      })
    ).toBeUndefined();
  });

  it("should return the cached request if within a custom grace period", () => {
    const ONE_MINUTE_IN_MILLIS = 60 * 1000;
    const gracePeriod = ONE_MINUTE_IN_MILLIS;
    const cache = new Cache(gracePeriod);
    const timestamp = "2020-11-25T19:00:00.000Z";
    const request = {
      requestId: "e38347fe-0fa2-4ff4-9f0b-f5e5174abfbb",
      entityId: "entity-1",
      requestContext: { value1: "red", value2: "green" },
      match: true,
      flagKey: "test-flag",
      segmentKey: "test-segment",
      timestamp,
      value: "blue",
      requestDurationMillis: 18.2473,
    };
    cache.addToCache(request);

    // Setting Date.now() to be 1ms before the end of the grace period
    MockDate.set(new Date(timestamp).valueOf() + gracePeriod - 1);
    expect(
      cache.getCached({
        entityId: "entity-1",
        flagKey: "test-flag",
        context: { value1: "red", value2: "green" },
      })
    ).toBeDefined();
  });

  it("should return undefined if out of a custom grace period", () => {
    const ONE_MINUTE_IN_MILLIS = 60 * 1000;
    const gracePeriod = ONE_MINUTE_IN_MILLIS;
    const cache = new Cache(gracePeriod);
    const timestamp = "2020-11-25T19:00:00.000Z";
    const request = {
      requestId: "e38347fe-0fa2-4ff4-9f0b-f5e5174abfbb",
      entityId: "entity-1",
      requestContext: { value1: "red", value2: "green" },
      match: true,
      flagKey: "test-flag",
      segmentKey: "test-segment",
      timestamp,
      value: "blue",
      requestDurationMillis: 18.2473,
    };
    cache.addToCache(request);

    // Setting Date.now() to be 1ms after the end of the grace period
    MockDate.set(new Date(timestamp).valueOf() + gracePeriod + 1);
    expect(
      cache.getCached({
        entityId: "entity-1",
        flagKey: "test-flag",
        context: { value1: "red", value2: "green" },
      })
    ).toBeUndefined();
  });
});
