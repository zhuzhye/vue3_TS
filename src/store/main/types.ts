export interface ISystemType {
  usersList: IUser[];
  usersTotalCount: number;
  pageList: any[];
  pageTotalCount: number;
}

interface IUser {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: string;
  updateAt: string;
}
