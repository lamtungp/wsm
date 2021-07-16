import { CHECKED_ACTION, SetCheckedAction } from './actionTypes';

export const SetChecked = (params: any): SetCheckedAction => {
    return {
        type: CHECKED_ACTION.SET_CHECKEDS,
        payload: params,
    };
};
