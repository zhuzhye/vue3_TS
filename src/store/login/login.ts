import { defineStore } from "pinia";
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from "@/service/login/login";
import type { IAccount } from "../../types";
import { localCache } from "@/utils/cache";
import router from "@/router";
import { mapMenusToRoutes } from "@/utils/mapMenus";
import userMainStore from "../main/main";
interface ILoginState {
  token: string;
  userInfo: {
    role?: {
      id: number;
      name: string;
      intro: string;
      createAt: string;
      updateAt: string;
    };
  };
  userMenus: any;
}
const useLoginStore = defineStore("login", {
  // 如何指定state类型
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录，获取token等信息
      const loginResult = await accountLogin(account);
      this.token = loginResult.data.token;
      localCache.setChche("token", this.token);

      // 2.获取登录用户的详细信息
      this.userInfo = await getUserInfoById(loginResult.data.id);
      console.log(this.userInfo, "this.userInfo");

      // 3.根据校色请求用户的权限（菜单menus）
      const userMenuResult = await getUserMenusByRoleId(this.userInfo.role!.id);
      console.log(userMenuResult, "userMenu");
      this.userMenus = userMenuResult.data;

      // 4.进行本地储存
      localCache.setChche("userInfo", this.userInfo);
      localCache.setChche("userMenus", this.userMenus);

      // 5.请求所有roles/department数据
      const mainStore = userMainStore();
      mainStore.fetchEntireDataAction();

      // 5.动态添加路由
      const routes = mapMenusToRoutes(this.userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });

      // 6.页面跳转(main页面)

      router.push("/main");
    },
    // 用户刷新默认加载数据
    loadLocalCacheAction() {
      const token = localCache.getChache("token");
      const userInfo = localCache.getChache("userInfo");
      const userMenus = localCache.getChache("userMenus");
      if (token && userInfo && userMenus) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenus = userMenus;
      }
      const mainStore = userMainStore();
      mainStore.fetchEntireDataAction();
      const routes = mapMenusToRoutes(this.userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    }
  }
});

export default useLoginStore;
