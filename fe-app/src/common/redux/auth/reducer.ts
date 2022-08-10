import { LoginRespone, AUTH_ACTIONS } from './actionTypes';

export interface AuthState {
  // jwtToken: string;
  user: LoginRespone;
}

const initialState: AuthState = {
  // jwtToken: '',
  user: { token: '', status: '' },
};

const reducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
