import type { RouteRecordRaw } from "vue-router";

function loadLocalRoutes() {
  // 1.1读取router/main内所有文件
  const files: Record<string, any> = import.meta.glob("../router/main/**/*.ts", {
    eager: true
  });
  const localRoutes: RouteRecordRaw[] = [];
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }
  return localRoutes;
}
export let firstMenu: any = null;
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes();
  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = [];
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url);
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path });
        }
        routes.push(route);
      }
      if (!firstMenu && route) firstMenu = subMenu;
    }
  }
  return routes;
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMens 所有菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu;
      }
    }
  }
  return undefined;
}
interface IBreadcurmbs {
  path: string;
  name: string;
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcurmbs[] = [];
  // 2.遍历获取面包屑的层级
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push({
          name: menu.name,
          path: menu.url
        });
        breadcrumbs.push({
          name: subMenu.name,
          path: subMenu.path
        });
      }
    }
  }
  return breadcrumbs;
}
