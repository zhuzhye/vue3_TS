export interface subItemType {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children: Children[];
  parentId: number;
}

export interface Children {
  id: number;
  url: any;
  name: string;
  sort: any;
  type: number;
  parentId: number;
  permission: string;
}
