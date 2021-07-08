import React from 'react';
// import log from './log';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  /* const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str; */
  const authorityString = typeof str === 'undefined' ? ["admin"] : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function setAuthority(payload) {
  const authority = payload.currentAuthority;
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-token', JSON.stringify(payload.token));
  localStorage.setItem('antd-pro-userName', JSON.stringify(payload.user));
  localStorage.setItem('antd-pro-userId', JSON.stringify(payload.userId));
  localStorage.setItem('antd-pro-role', JSON.stringify(payload.role));
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

export const noMatch = () => (
  <div>
    Bạn không có quyền truy cập trang này.
  </div>
);

export const havePermission = (currentAuthority, funcName, roles) => {
  // log("havePermission currentAuthority: %o, funcName: %o, roles: %o", currentAuthority, funcName, roles)
  if (Array.isArray(currentAuthority)) {
    const matchRole = currentAuthority.filter(item => item.Menu && item.Menu.Name === funcName)
    if (Array.isArray(roles))
      return roles.reduce((acc, item) => ({
        ...acc,
        [item]: matchRole && matchRole[0] && matchRole[0][item] || false
      }), {})
    if (typeof roles === "string")
      return {
        [roles]: matchRole && matchRole[0] && matchRole[0][roles] || false
      }
    return false;
  }
  return false;
}

export const havePermissionWithMenuId = (currentAuthority, menuId, roles) => {
  // log("havePermission currentAuthority: %o, funcName: %o, roles: %o", currentAuthority, funcName, roles)
  // eslint-disable-next-line no-param-reassign
  roles = roles.map(i => {
    if(i === 'IsView') return 'isView';
    if (i === 'IsInsert') return 'isNew';
    if (i === 'IsUpdate') return 'isUpdate';
    if (i === 'IsDelete') return 'isDelete';
    return i;
  })
  if (Array.isArray(currentAuthority)) {
    const matchRole = currentAuthority.filter(item => item.menus && Number(item.menus.id) === Number(menuId))
    if (Array.isArray(roles))
      return roles.reduce((acc, item) => ({
        ...acc,
        [item]: matchRole && matchRole[0] && matchRole[0][item] || false
      }), {})
    if (typeof roles === "string")
      return {
        [roles]: matchRole && matchRole[0] && matchRole[0][roles] || false
      }
    return false;
  }
  return false;
}

