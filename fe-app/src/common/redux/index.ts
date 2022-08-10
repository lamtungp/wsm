import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

// Import all reducers here
import authReducer, { AuthState } from './auth/reducer';
// Import all sagas here
import authSagas from './auth/sagas';
import checkinReducer, { CheckinState } from './checkin/reducer';
import errorReducer, { ErrorState } from './error/reducer';
import sidebarReducer, { SidebarState } from './sidebar/reducer';
import userReducer, { UserState } from './user/reducer';

export interface GlobalState {
  auth: AuthState;
  sidebar: SidebarState;
  user: UserState;
  checkin: CheckinState;
  error: ErrorState;
}

export const combinedReducer = combineReducers({
  auth: authReducer,
  sidebar: sidebarReducer,
  user: userReducer,
  checkin: checkinReducer,
  error: errorReducer,
});

export const rootSaga = function* (): any {
  yield all([authSagas]);
};
