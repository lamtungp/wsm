import { SIDEBAR_ACTION } from './actionTypes';

export interface SidebarState {
  sidebarShow: any;
}

const initialState: SidebarState = {
  sidebarShow: 'responsive',
};

const reducer = (state = initialState, action: any): SidebarState => {
  switch (action.type) {
    case SIDEBAR_ACTION.SET_SIDEBAR:
      return {
        ...state,
        sidebarShow: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
