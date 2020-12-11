import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    component: () =>
      import(/* webpackChunkName: "post-detail" */ "../views/PostDetail.vue")
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    component: () =>
      import(/* webpackChunkName: "user-detail" */ "../views/UserDetail.vue")
  },
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
