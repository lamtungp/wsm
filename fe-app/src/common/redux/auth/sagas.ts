import { call, put, takeEvery } from 'redux-saga/effects';

import { AUTH_ACTIONS, LoginAction } from './actionTypes';
import { loginSuccess, loginFailure } from './actions';
import authServices from './services';

function* loginSaga(action: LoginAction) {
    const { email, password } = action.payload;
    console.log(action.payload);

    try {
        const response = yield call(authServices.login, { email, password });
        console.log(response);
        if (!!response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('userId', response.id);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('vacationDay', response.vacationDay);
            yield put(loginSuccess({ email: action.payload.email, token: response.token }));
            if (localStorage.getItem('role') === 'admin') window.location.pathname = '/admin';
            else window.location.pathname = '';
        } else {
            alert(response.message);
        }
    } catch (error) {
        yield put(loginFailure());
    }
}

function* watchAll() {
    yield takeEvery(AUTH_ACTIONS.LOGIN, loginSaga);
}

export default watchAll;
