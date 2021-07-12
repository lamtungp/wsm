export const AUTH_ACTIONS = {
    LOGIN: 'LOGIN',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
};

interface LoginParams {
    email: string;
    password: string;
}

interface LoginRespone {
    email: string;
    token: string;
}

interface LoginAction {
    type: typeof AUTH_ACTIONS.LOGIN;
    payload: LoginParams;
}

interface LoginSuccessAction {
    type: typeof AUTH_ACTIONS.LOGIN_SUCCESS;
    payload: LoginRespone;
}

interface LoginFailureAction {
    type: typeof AUTH_ACTIONS.LOGIN_FAILURE;
}

interface LogoutAction {
    type: typeof AUTH_ACTIONS.LOGOUT;
}

export type { LoginParams, LoginRespone, LoginAction, LoginSuccessAction, LoginFailureAction, LogoutAction };
