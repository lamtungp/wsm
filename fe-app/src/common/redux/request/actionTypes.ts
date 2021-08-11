export const REQUEST_ACTION = {
  SET_REQUESTS: 'SET_REQUESTS',
};

interface SetRequestAction {
  type: typeof REQUEST_ACTION.SET_REQUESTS;
  payload: any;
}

export type { SetRequestAction };
