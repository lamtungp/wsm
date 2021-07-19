export const USER_ACTION = {
    SET_USERS: 'SET_USERS',
};

interface SetUserAction {
    type: typeof USER_ACTION.SET_USERS;
    payload: any;
}

export type { SetUserAction };
