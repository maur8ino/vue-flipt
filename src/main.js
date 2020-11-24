import Vue from "vue";
import App from "./App.vue";
import VueFlipt from "./plugin";

Vue.use(VueFlipt, { url: "http://localhost:8080" });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
