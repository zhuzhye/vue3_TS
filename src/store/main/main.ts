import { getEntirDepartments, getEntirRoles } from "@/service/main/main";
import { defineStore } from "pinia";

interface IMainState {
  entirRoles: any[];
  entirDepartments: any[];
}
const userMainStore = defineStore("main", {
  state: (): IMainState => ({
    entirRoles: [],
    entirDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntirRoles();
      const departmentResult = await getEntirDepartments();
      this.entirRoles = rolesResult.data.list;
      this.entirDepartments = departmentResult.data.list;
    }
  }
});
export default userMainStore;
