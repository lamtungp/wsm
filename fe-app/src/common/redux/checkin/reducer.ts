import { CHECKIN_ACTION } from './actionTypes';
// import productService from "./service";

export interface CheckinState {
  checkins: any[];
}

const initialState: CheckinState = {
  checkins: [],
};

const reducer = (state = initialState, action: any): CheckinState | undefined => {
  switch (action.type) {
    case CHECKIN_ACTION.SET_CHECKINS:
      return {
        ...state,
        checkins: action.payload,
      };
  }
  return state;
};

export default reducer;
