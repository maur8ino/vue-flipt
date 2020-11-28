export default {
  name: "FliptEvaluate",

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

  data() {
    return {
      error: null,
      loading: false,
      match: null,
      value: null,
    };
  },

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
