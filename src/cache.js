import { hash } from "@/hash";

const FIFTEEN_MINUTES_IN_MILLIS = 15 * 60 * 1000;

export const defaultCacheGracePeriod = FIFTEEN_MINUTES_IN_MILLIS;

export class Cache {
  constructor(cacheGracePeriod = defaultCacheGracePeriod) {
    this._cacheGracePeriod = cacheGracePeriod;
    this._map = new Map();
  }

  _getKey({ flagKey, entityId, context }) {
    return hash({ flagKey, entityId, context });
  }

  addToCache(request) {
    const { flagKey, entityId, requestContext: context, timestamp: timestampString } = request;
    const hashedKey = this._getKey({ flagKey, entityId, context });
    const timestamp = new Date(timestampString).valueOf();
    this._map.set(hashedKey, { request, timestamp });
  }

  getCached({ flagKey, entityId, context }) {
    const hashedKey = this._getKey({ flagKey, entityId, context });
    const cachedValue = this._map.get(hashedKey);
    if (cachedValue && cachedValue.timestamp && cachedValue.timestamp + this._cacheGracePeriod > Date.now()) {
      return cachedValue.request;
    }

    return false;
  }
}
