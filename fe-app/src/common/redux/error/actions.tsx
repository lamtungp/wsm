import { ERROR_ACTION, SetErrorAction } from './actionTypes';

export const SetSidebar = (params: any): SetErrorAction => {
    return {
        type: ERROR_ACTION.SET_ERROR,
        payload: params,
    };
};
