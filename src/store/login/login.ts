import { defineStore } from "pinia";
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from "@/service/login/login";
import type { IAccount } from "../../types";
import { localCache } from "@/utils/cache";
import router from "@/router";
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
    token: localCache.getChache("token") ?? "",
    userInfo: localCache.getChache("userInfo") ?? {},
    userMenus: localCache.getChache("userMenus") ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录，获取token等信息
      const loginResult = await accountLogin(account);
      this.token = loginResult.data.token;

      // 2.获取登录用户的详细信息
      this.userInfo = await getUserInfoById(loginResult.data.id);
      console.log(this.userInfo, "this.userInfo");

      // 3.根据校色请求用户的权限（菜单menus）
      const userMenuResult = await getUserMenusByRoleId(this.userInfo.role!.id);
      console.log(userMenuResult, "userMenu");
      this.userMenus = userMenuResult.data;

      // 4.进行本地储存
      localCache.setChche("token", this.token);
      localCache.setChche("userInfo", this.userInfo);
      localCache.setChche("userMenus", this.userMenus);
      // 4.页面跳转(main页面)
      router.push("/main");
    }
  }
});

export default useLoginStore;
