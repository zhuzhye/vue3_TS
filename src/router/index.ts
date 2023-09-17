import { localCache } from "@/utils/cache";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  // 映射关系：path=>component
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      component: () => import("../views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/NotFound/NotFounds.vue")
    }
  ]
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getChache("token");
    if (!token) {
      return "/login";
    }
  }
});
export default router;
