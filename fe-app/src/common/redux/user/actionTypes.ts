export const USER_ACTION = {
  SET_USERS: 'SET_USERS',
  SET_AVATAR: 'SET_AVATAR',
};

interface SetUserAction {
  type: typeof USER_ACTION.SET_USERS;
  payload: any;
}

interface SetAvatarAction {
  type: typeof USER_ACTION.SET_AVATAR;
  payload: string;
}

export type { SetUserAction, SetAvatarAction };
