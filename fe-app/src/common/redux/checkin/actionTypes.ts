export const CHECKIN_ACTION = {
    SET_CHECKINS: 'SET_CHECKINS',
};

interface SetCheckinAction {
    type: typeof CHECKIN_ACTION.SET_CHECKINS;
    payload: any;
}

export type { SetCheckinAction };
