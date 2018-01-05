import axios from "axios";
import KeenUI from "keen-ui";
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "keen-ui/dist/keen-ui.css";

if (!process.env.IS_WEB) {
  // tslint:disable-next-line:no-var-requires
  Vue.use(require("vue-electron"));
}

Vue.use(KeenUI);

(Vue as any).http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
