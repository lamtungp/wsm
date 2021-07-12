import {
    LoginParams,
    LoginRespone,
    LoginAction,
    LoginSuccessAction,
    LoginFailureAction,
    LogoutAction,
    AUTH_ACTIONS,
} from './actionTypes';

export const login = (params: LoginParams): LoginAction => {
    return {
        type: AUTH_ACTIONS.LOGIN,
        payload: params,
    };
};

export const loginSuccess = (response: LoginRespone): LoginSuccessAction => {
    return {
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response,
    };
};

export const loginFailure = (): LoginFailureAction => {
    return {
        type: AUTH_ACTIONS.LOGIN_FAILURE,
    };
};

export const logout = (): LogoutAction => {
    return {
        type: AUTH_ACTIONS.LOGOUT,
    };
};
