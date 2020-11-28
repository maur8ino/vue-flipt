import CFliptEvaluate from "@/components/FliptEvaluate";
import { DollarFlipt } from "./dollar-flipt";

// Declare install function executed by Vue.use()
function install(Vue, options) {
  if (install.installed) {
    return;
  }
  install.installed = true;

  Vue.component("flipt-evaluate", CFliptEvaluate);
  Vue.component("FliptEvaluate", CFliptEvaluate);

  // Lazy creation
  if (!Object.prototype.hasOwnProperty.call(Vue, "$flipt")) {
    Object.defineProperty(Vue.prototype, "$flipt", {
      get() {
        if (!this.$_flipt) {
          this.$_flipt = new DollarFlipt(options);
        }
        return this.$_flipt;
      },
    });
  }
}

// Create module definition for Vue.use()
const plugin = {
  install,
  version: __VERSION__,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export const FliptEvaluate = CFliptEvaluate;
export default plugin;
