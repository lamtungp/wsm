import { USER_ACTION } from './actionTypes';
// import productService from "./service";

export interface UserState {
  users: any[];
}

const initialState: UserState = {
  users: [],
};

const reducer = (state = initialState, action: any): UserState | undefined => {
  switch (action.type) {
    case USER_ACTION.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
  }
  return state;
};

export default reducer;
