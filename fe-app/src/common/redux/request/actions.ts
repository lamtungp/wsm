import { REQUEST_ACTION, SetRequestAction } from './actionTypes';

export const SetRequest = (params: any): SetRequestAction => {
    return {
        type: REQUEST_ACTION.SET_REQUESTS,
        payload: params,
    };
};
