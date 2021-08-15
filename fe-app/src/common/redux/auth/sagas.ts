import { call, put, takeEvery } from 'redux-saga/effects';

import { AUTH_ACTIONS, LoginAction } from './actionTypes';
import { loginSuccess, loginFailure } from './actions';
import authServices from './services';

function* loginSaga(action: LoginAction) {
  const { email, password } = action.payload;
  console.log(action.payload);

  try {
    const response = yield call(authServices.login, { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('userId', response.data.id);
    localStorage.setItem('email', action.payload.email);
    localStorage.setItem('vacationDay', response.vacationDay);
    yield put(loginSuccess({ token: response.data.token, status: response.message }));
    if (localStorage.getItem('role') === 'admin') window.location.pathname = '/admin';
    else window.location.pathname = '';
  } catch (error) {
    // alert(error);
    yield put(loginFailure({ token: '', status: 'failure' }));
  }
}

function* watchAll() {
  yield takeEvery(AUTH_ACTIONS.LOGIN, loginSaga);
}

export default watchAll;
