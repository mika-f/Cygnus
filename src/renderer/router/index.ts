import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      component: require("@/components/LandingPage").default,
      name: "landing-page",
      path: "/",
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
