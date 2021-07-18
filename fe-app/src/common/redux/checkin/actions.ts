import { CHECKIN_ACTION, SetCheckinAction } from './actionTypes';

export const SetCheckin = (params: any): SetCheckinAction => {
    return {
        type: CHECKIN_ACTION.SET_CHECKINS,
        payload: params,
    };
};
