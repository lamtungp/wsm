import { USER_ACTION } from './actionTypes';
// import productService from "./service";

export interface UserState {
  users: any[];
  avatar: string;
}

const initialState: UserState = {
  users: [],
  avatar: '',
};

const reducer = (state = initialState, action: any): UserState | undefined => {
  switch (action.type) {
    case USER_ACTION.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case USER_ACTION.SET_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
  }
  return state;
};

export default reducer;
