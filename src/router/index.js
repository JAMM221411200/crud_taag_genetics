import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "BookIndex" },
  },

  {
    path: "/book",
    name: "BookIndex",
    component: () => import("@/views/Book/Index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
