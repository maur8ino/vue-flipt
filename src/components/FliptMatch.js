export default {
  name: "FliptMatch",

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
  },

  data() {
    return {
      error: null,
      loading: false,
      match: null,
    };
  },

  methods: {
    getDollarFlipt() {
      return this.$flipt;
    },
  },

  mounted() {
    this.loading = true;
    this.$flipt
      .evaluate(this.entityId, this.flagKey, this.context)
      .then(response => {
        this.match = response.match;
      })
      .catch(error => {
        this.$emit("error", error);
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  },

  render() {
    return this.loading
      ? this.$slots.loading
      : this.error
      ? this.$slots.error
      : this.$slots.default;
  },
};
