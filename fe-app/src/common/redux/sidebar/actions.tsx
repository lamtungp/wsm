import { SIDEBAR_ACTION, SetSidebarAction } from './actionTypes';

export const SetSidebar = (params: any): SetSidebarAction => {
  return {
    type: SIDEBAR_ACTION.SET_SIDEBAR,
    payload: params,
  };
};
