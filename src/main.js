import Vue from "vue";
import App from "./App.vue";

import "./five-on-styles.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
