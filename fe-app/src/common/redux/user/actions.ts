import { USER_ACTION, SetUserAction, SetAvatarAction } from './actionTypes';

export const SetUser = (params: any): SetUserAction => {
  return {
    type: USER_ACTION.SET_USERS,
    payload: params,
  };
};

export const SetAvatar = (params: string): SetAvatarAction => {
  return {
    type: USER_ACTION.SET_AVATAR,
    payload: params,
  };
};
