import {
  fliptEntityId,
  fliptFlagKey,
  fliptContext,
  fliptBaseURL,
} from "./FliptProvider";

export default {
  name: "Flipt",

  props: {
    entityId: {
      type: String,
      default() {
        return this.fliptEntityId;
      },
    },
    flagKey: {
      type: String,
      default() {
        return this.fliptFlagKey;
      },
    },
    context: {
      type: Object,
      default() {
        return this.fliptContext;
      },
    },
    baseURL: {
      type: String,
      default() {
        return this.fliptBaseURL;
      },
    },
  },

  data() {
    return {
      error: null,
      loading: false,
      match: null,
      value: null,
    };
  },

  inject: { fliptEntityId, fliptFlagKey, fliptContext, fliptBaseURL },

  methods: {
    getDollarFlipt() {
      return this.$flipt;
    },
  },

  created() {
    this.loading = true;
    this.$flipt
      .evaluate(this.entityId, this.flagKey, this.context, this.baseURL)
      .then(response => {
        this.match = response.match;
        this.value = response.value;
      })
      .catch(error => {
        this.error = true;
        this.$emit("error", error);
      })
      .finally(() => {
        this.loading = false;
        this.$emit("loaded", { match: this.match, value: this.value });
      });
  },

  render() {
    return this.$scopedSlots.default({
      error: this.error,
      loading: this.loading,
      match: this.match,
      value: this.value,
    });
  },
};
