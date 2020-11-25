import { rest } from "msw";
import { setupServer } from "msw/node";

import { DollarFlipt } from "@/dollar-flipt";

describe("DollarFlipt", () => {
  describe("constructor", () => {
    it("should throw an error if no options are provided", () => {
      expect(() => new DollarFlipt()).toThrowError("Options argument required");
      expect(() => new DollarFlipt({ foo: "bar" })).toThrowError("Options url argument required");
    });
  });

  describe("evaluate method", () => {
    it("should throw an error if no entityId is provided", async () => {
      expect.assertions(1);
      const df = new DollarFlipt({ url: "https://myserver.io" });
      try {
        await df.evaluate();
      } catch (e) {
        expect(e).toEqual(new Error("entityId argument required"));
      }
    });

    it("should throw an error if no flagKey is provided", async () => {
      expect.assertions(1);
      const df = new DollarFlipt({ url: "https://myserver.io" });
      try {
        await df.evaluate("entity-1");
      } catch (e) {
        expect(e).toEqual(new Error("flagKey argument required"));
      }
    });

    describe("when doing api calls", () => {
      const request1 = {
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
      const server = setupServer(
        rest.post("https://myserver.io/api/v1/evaluate", (__req, res, ctx) => {
          return res(ctx.status(200), ctx.json(request1));
        }),
        rest.post("https://mywrongserver.io/api/v1/evaluate", (__req, res, ctx) => {
          return res(ctx.status(500), ctx.json({}));
        })
      );

      beforeAll(() => server.listen());
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());

      it("should hit the evaluate api", async () => {
        const df = new DollarFlipt({ url: "https://myserver.io" });
        df._cache.addToCache = jest.fn();
        df._cache.getCached = jest.fn();

        const request = await df.evaluate("entity-1", "test-flag", { value1: "red", value2: "green" });

        expect(request).toEqual(request1);
        expect(df._cache.addToCache).toHaveBeenCalled();
        expect(df._cache.getCached).toHaveBeenCalled();
      });

      it("should not hit the evaluate api if the value is cached", async () => {
        const df = new DollarFlipt({ url: "https://myserver.io" });
        df._cache.addToCache = jest.fn();
        df._cache.getCached = jest.fn(() => request1);

        const request = await df.evaluate("entity-1", "test-flag", { value1: "red", value2: "green" });

        expect(request).toEqual(request1);
        expect(df._cache.addToCache).not.toHaveBeenCalled();
        expect(df._cache.getCached).toHaveBeenCalled();
      });

      it("should throw an error if the request fails", async () => {
        const df = new DollarFlipt({ url: "https://mywrongserver.io" });

        try {
          await df.evaluate("entity-1", "test-flag", { value1: "red", value2: "green" });
        } catch (e) {
          expect(e).toEqual(new Error("Request failed with status code 500"));
        }
      });
    });
  });
});