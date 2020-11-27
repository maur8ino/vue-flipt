import axios from "axios";

import { Cache } from "@/lib/cache";

export class DollarFlipt {
  constructor({ baseURL, cacheGracePeriod } = {}) {
    this._axiosInstance = axios.create({ baseURL });
    this._cache = new Cache(cacheGracePeriod);
  }

  async evaluate(entityId, flagKey, context, baseURL) {
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

    const { data: request } = await this._axiosInstance({
      url: "/api/v1/evaluate",
      baseURL,
      method: "POST",
      data: {
        entityId,
        flagKey,
        context,
      },
    });
    this._cache.addToCache(request);

    return request;
  }
}
