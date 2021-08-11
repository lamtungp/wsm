export const SIDEBAR_ACTION = {
  SET_SIDEBAR: 'SET_SIDEBAR',
};

interface SetSidebarAction {
  type: typeof SIDEBAR_ACTION.SET_SIDEBAR;
  payload: any;
}

export type { SetSidebarAction };
