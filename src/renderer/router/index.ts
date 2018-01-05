import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      component: require("@/components/Loading").default,
      name: "loading",
      path: "/",
    },
    {
      component: require("@/components/Home").default,
      name: "home",
      path: "/home",
    },
  ]
});
