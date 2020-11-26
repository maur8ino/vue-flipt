import { hash } from "@/lib/hash";

describe("hash", () => {
  it("should hash a request object with empty context", () => {
    const hashed = hash({ entityId: "entity-1", flagKey: "test-flag" });

    expect(hashed).toBe(
      '{"entityId":"entity-1","flagKey":"test-flag","context":{}}'
    );
  });

  it("should hash a request object no matter the order", () => {
    const hashed1 = hash({
      entityId: "entity-1",
      flagKey: "test-flag",
      context: { foo: 1, bar: 2, baz: 3 },
    });
    const hashed2 = hash({
      entityId: "entity-1",
      context: { baz: 3, bar: 2, foo: 1 },
      flagKey: "test-flag",
    });
    const hashed3 = hash({
      flagKey: "test-flag",
      entityId: "entity-1",
      context: { bar: 2, foo: 1, baz: 3 },
    });

    expect(hashed1).toBe(
      '{"entityId":"entity-1","flagKey":"test-flag","context":{"bar":2,"baz":3,"foo":1}}'
    );
    expect(hashed2).toBe(
      '{"entityId":"entity-1","flagKey":"test-flag","context":{"bar":2,"baz":3,"foo":1}}'
    );
    expect(hashed3).toBe(
      '{"entityId":"entity-1","flagKey":"test-flag","context":{"bar":2,"baz":3,"foo":1}}'
    );
  });
});
