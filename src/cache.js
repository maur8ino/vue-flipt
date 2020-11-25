const FIFTEEN_MINUTES_IN_MILLIS = 15 * 60 * 1000;

export const defaultCacheGracePeriod = FIFTEEN_MINUTES_IN_MILLIS;

export class Cache {
  constructor(cacheGracePeriod = defaultCacheGracePeriod) {
    this._cacheGracePeriod = cacheGracePeriod;
    this._cache = new Map();
  }

  isCached({ flagKey, entityId, context }) {
    const key = { flagKey, entityId, requestContext: context };
    console.log(this._cache);
    if (this._cache.has(key)) {
      const { timestamp } = this._cache.get(key);
      return timestamp > Date.now() - this._cacheGracePeriod;
    }

    return false;
  }

  addToCache(request) {
    const { flagKey, entityId, requestContext: context, timestamp: timestampString } = request;
    const key = { flagKey, entityId };
    if (context) {
      key.context = context;
    }
    const timestamp = new Date(timestampString).valueOf();
    this._cache.set(key, { request, timestamp });
  }
}
