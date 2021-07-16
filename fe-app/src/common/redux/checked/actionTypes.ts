export const CHECKED_ACTION = {
    SET_CHECKEDS: 'SET_CHECKEDS',
};

interface SetCheckedAction {
    type: typeof CHECKED_ACTION.SET_CHECKEDS;
    payload: any;
}

export type { SetCheckedAction };
