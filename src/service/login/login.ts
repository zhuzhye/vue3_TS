import httpRequest from "..";

export function accountLogin(account: any) {
  return httpRequest.post({
    url: "/login",
    data: account
  });
}

export function getUserInfoById(id: number | string): Promise<any> {
  return new Promise((resolve) => {
    httpRequest
      .get({
        url: `/users/${id}`
      })
      .then((res) => {
        resolve(res.data);
      });
  });
}

export function getUserMenusByRoleId(id: number) {
  return httpRequest.get({
    url: `/role/${id}/menu`
  });
}
