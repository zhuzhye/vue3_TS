import { localCache } from "@/utils/cache";
import { firstMenu } from "@/utils/mapMenus";
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
      name: "main",
      component: () => import("../views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/NotFound/NotFounds.vue")
    }
  ]
});

// 用户进行刷新：判断用户是否登录以及是否包含userMenu菜单
router.beforeEach((to) => {
  const token = localCache.getChache("token");
  if (to.path !== "/login") {
    if (!token) {
      return "/login";
    }
  }
  if (to.path === "/main") {
    console.log(firstMenu, "firstMenu");
    if (token) {
      return firstMenu?.url;
    }
  }
});
export default router;
