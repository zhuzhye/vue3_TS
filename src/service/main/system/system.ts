import httpRequest from "@/service";
import type { IUserInfoType } from "./types";
/** 用户的网络请求 **/
export function postUserListData(queryInfo: any) {
  return httpRequest.post({
    url: "/users/list",
    data: queryInfo
  });
}

export function deleteUserById(id: number) {
  return httpRequest.delete({
    url: `/users/${id}`
  });
}

export function newUserData(userInfo: IUserInfoType) {
  return httpRequest.post({
    url: "/users",
    data: userInfo
  });
}

export function editUserData(id: number, userInfo: any) {
  return httpRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  });
}

/**针对页面的网络请求：增删改查 */

// function getPageUrl() {}

export function postPageListData(pageName: string, queryInfo: any) {
  return httpRequest.post({
    url: `${pageName}/list`,
    data: queryInfo
  });
}

export function deletePageById(pageName: string, id: number) {
  return httpRequest.delete({
    url: `/${pageName}/${id}`
  });
}

export function newPageData(pageName: string, pageInfo: any) {
  return httpRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  });
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return httpRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  });
}
