import axios from "axios";

import { Cache } from "@/lib/cache";

export class DollarFlipt {
  constructor(options) {
    if (!options) {
      throw new Error("Options argument required");
    }
    if (!options.url) {
      throw new Error("Options url argument required");
    }

    this._options = options;
    this._axiosInstance = axios.create({ baseURL: options.url });
    this._cache = new Cache(options.cacheGracePeriod);
  }

  async evaluate(entityId, flagKey, context) {
    if (!entityId) {
      throw new Error("entityId argument required");
    }

    if (!flagKey) {
      throw new Error("flagKey argument required");
    }

    const key = { entityId, flagKey, context };
    const cachedRequest = this._cache.getCached(key);

    if (cachedRequest) {
      return cachedRequest;
    }

    const { data: request } = await this._axiosInstance.post(
      `/api/v1/evaluate`,
      {
        entityId,
        flagKey,
        context,
      }
    );
    this._cache.addToCache(request);

    return request;
  }
}
