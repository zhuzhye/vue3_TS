import {
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData
} from "@/service/main/system/system";
import { defineStore } from "pinia";
import type { ISystemType } from "./types";
import { deleteUserById, deletePageById } from "../../service/main/system/system";

const useSystemStore = defineStore("system", {
  state: (): ISystemType => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const usersListResult = await postUserListData(queryInfo);
      const { totalCount, list } = usersListResult.data;
      this.usersTotalCount = totalCount;
      this.usersList = list;
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除操作
      const delteResult = await deleteUserById(id);
      console.log(delteResult);
      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 });
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      await newUserData(userInfo);
      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 });
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo);
      console.log(editResult);
      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 });
    },
    /** 针对页面的数据：增删改查 */
    async postPageListAciton(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo);
      const { totalCount, list } = pageListResult.data;
      this.pageList = list;
      this.pageTotalCount = totalCount;
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id);
      console.log(deleteResult);
      this.postPageListAciton(pageName, { offset: 0, size: 10 });
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo);
      console.log(newResult);
      this.postPageListAciton(pageName, { offset: 0, size: 10 });
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo);
      console.log(editResult);
      this.postPageListAciton(pageName, { offset: 0, size: 10 });
    }
  }
});

export default useSystemStore;
