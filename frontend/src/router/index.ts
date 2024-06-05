import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"
import { createRouterGuard } from "./guard"

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home.vue"),
    meta: {
      title: "Home",
      icon: "mdi-home"
    }
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/index.vue"),
    meta: {
      title: "Index",
      icon: "mdi-island-variant"
    }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about.vue"),
    meta: {
      title: "About",
      icon: "mdi-alert-box-outline"
    }
  },
  {
    path: "/config",
    name: "config",
    component: () => import("@/views/config.vue"),
    meta: {
      title: "Config",
      icon: "mdi-cog-outline"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    meta: {
      title: "Login",
      icon: "mdi-login"
    }
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/map.vue"),
    meta: {
      title: "map",
      icon: "mdi-map-outline"
    }
  },
  // will match everything and put it under `route.params.pathMatch`
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
    meta: { title: "404", icon: "mdi-function", ignore: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
createRouterGuard(router)

export default router
