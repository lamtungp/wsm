import { call, put, takeEvery } from 'redux-saga/effects';
// import { useDispatch } from 'react-redux';

import { AUTH_ACTIONS, LoginAction } from './actionTypes';
import { loginSuccess, loginFailure } from './actions';
import authServices from './services';

function* loginSaga(action: LoginAction) {
    const { email, password } = action.payload;
    console.log(action.payload);

    try {
        const response = yield call(authServices.login, { email, password });
        console.log(response);
        if (response) {
            localStorage.setItem('token', response);
            localStorage.setItem('email', action.payload.email);
            yield put(loginSuccess({ email: action.payload.email, token: response }));
            window.location.pathname = '';
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
