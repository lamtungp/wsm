import { USER_ACTION, SetUserAction } from './actionTypes';

export const SetUser = (params: any): SetUserAction => {
    return {
        type: USER_ACTION.SET_USERS,
        payload: params,
    };
};
