import axios from "axios";
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) {
  // tslint:disable-next-line:no-var-requires
  Vue.use(require("vue-electron"));
}

(Vue as any).http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
