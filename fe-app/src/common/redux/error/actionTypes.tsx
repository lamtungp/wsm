export const ERROR_ACTION = {
  SET_ERROR: 'SET_ERROR',
};

interface SetErrorAction {
  type: typeof ERROR_ACTION.SET_ERROR;
  payload: any;
}

export type { SetErrorAction };
