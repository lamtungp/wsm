import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

// Import all reducers here
import authReducer, { AuthState } from './auth/reducer';
// Import all sagas here
import authSagas from './auth/sagas';
import sidebarReducer, { SidebarState } from './sidebar/reducer';
import userReducer, { UserState } from './user/reducer';

export interface GlobalState {
    auth: AuthState;
    sidebar: SidebarState;
    user: UserState;
}

export const combinedReducer = combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer,
    user: userReducer,
});

export const rootSaga = function* (): any {
    yield all([authSagas]);
};
