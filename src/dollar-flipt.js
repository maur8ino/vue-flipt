import axios from "axios";

import { Cache } from "./cache";

export class DollarFlipt {
  constructor(options) {
    if (!options) {
      throw new Error("Options argument required");
    }
    if (!options.url) {
      throw new Error("Options url argument required");
    }

    this._options = options;
  }

  get axiosInstance() {
    if (!this._axiosInstance) {
      this._axiosInstance = axios.create({ baseURL: this._options.url });
    }

    return this._axiosInstance;
  }

  get cache() {
    if (!this._cache) {
      this._cache = new Cache(this._options.cacheGracePeriod);
    }

    return this._cache;
  }

  async evaluate(entityId, flagKey, context) {
    if (!entityId) {
      throw new Error("entityId argument required");
    }

    if (!flagKey) {
      throw new Error("flagKey url argument required");
    }

    const key = { entityId, flagKey, context };
    const cachedRequest = this.cache.getCached(key);

    if (cachedRequest) {
      return cachedRequest;
    }

    const { data: request } = await this.axiosInstance.post(`/api/v1/evaluate`, {
      entityId,
      flagKey,
      context,
    });
    this.cache.addToCache(request);

    return request;
  }
}
