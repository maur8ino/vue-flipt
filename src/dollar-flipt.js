import axios from "axios";

export class DollarFlipt {
  constructor(options) {
    if (!options) {
      throw new Error("Options argument required");
    }
    if (!options.url) {
      throw new Error("Options url argument required");
    }

    this.options = options;
  }

  getAxiosInstance() {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({ baseURL: this.options.url });
    }

    return this.axiosInstance;
  }

  async evaluate() {
    const { data: flagRes } = await this.getAxiosInstance().post(`/api/v1/evaluate`, {
      flagKey: "test-flag",
      entityId: "ss",
      context: {
        ciccio: "ciccio",
      },
    });

    return flagRes;
  }
}
