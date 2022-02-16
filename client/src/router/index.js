import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "Index",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("/@views/Home.vue"),
    // meta: {
    //   layout: HomeLayout,
    // },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
