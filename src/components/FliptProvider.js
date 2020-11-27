export const fliptEntityId = Symbol("fliptEntityId");
export const fliptFlagKey = Symbol("fliptFlagKey");
export const fliptContext = Symbol("fliptContext");
export const fliptBaseURL = Symbol("fliptBaseURL");

export default {
  name: "FliptProvider",
  props: {
    entityId: {
      type: String,
      required: true,
    },
    flagKey: {
      type: String,
      required: true,
    },
    context: {
      type: Object,
    },
    baseURL: {
      type: String,
    },
  },

  provide() {
    return {
      [fliptEntityId]: this.entityId,
      [fliptFlagKey]: this.flagKey,
      [fliptContext]: this.context,
      [fliptBaseURL]: this.baseURL,
    };
  },

  render() {
    return this.$scopedSlots.default();
  },
};
