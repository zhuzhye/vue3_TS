import httpRequest from "..";
export function getEntirRoles() {
  return httpRequest.post({
    url: "/role/list"
  });
}

export function getEntirDepartments() {
  return httpRequest.post({
    url: "/department/list"
  });
}
