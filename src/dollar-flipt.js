import axios from "axios";

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

  async evaluate(entityId, flagKey, context) {
    if (!entityId) {
      throw new Error("entityId argument required");
    }
    if (!flagKey) {
      throw new Error("flagKey url argument required");
    }

    const { data } = await this.axiosInstance.post(`/api/v1/evaluate`, {
      entityId,
      flagKey,
      context,
    });

    return data;
  }
}
