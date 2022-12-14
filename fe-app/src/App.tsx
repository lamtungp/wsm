import { CSpinner } from '@coreui/react';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './views/pages/error/ErrorFallback';

import './assets/scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">
      <CSpinner color="dark" /> Loading ...
    </div>
  </div>
);

const LayoutUser = React.lazy(() => import('./components/user/Layout'));
const LayoutAdmin = React.lazy(() => import('./components/admin/Layout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const ResetPassword = React.lazy(() => import('./views/pages/resetpassword/ResetPassword'));
const ConfirmAccount = React.lazy(() => import('./views/pages/confirmAccount/ConfirmAccount'));
const Error500 = React.lazy(() => import('./views/pages/error/Error500'));

const App: React.FunctionComponent = (): React.ReactElement => {
  const wrapper = React.createRef();

  return (
    <div className="App" ref={wrapper as any}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={loading}>
          <BrowserRouter>
            <Switch>
              <Route path="/confirm/account/:confirmationCode" component={ConfirmAccount} />
              <Route path="/confirm/resetpassword/:confirmationCode" component={ResetPassword} />
              <Route path="/error/500" component={Error500} />
              <Route
                path="/admin"
                render={() => {
                  return localStorage.getItem('token') && localStorage.getItem('role') === 'admin' ? (
                    <LayoutAdmin />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route
                path="/login"
                render={() => {
                  if (localStorage.getItem('token')) {
                    if (localStorage.getItem('role') === 'user') return <Redirect to="/" />;
                    else if (localStorage.getItem('role') === 'admin') return <Redirect to="/admin" />;
                    else return <Redirect to="/manager" />;
                  }
                  return <Login />;
                }}
              />
              <Route
                path="/"
                render={() => {
                  return localStorage.getItem('token') &&
                    (localStorage.getItem('role') === 'user' || localStorage.getItem('role') === 'manager') ? (
                    <LayoutUser />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
            </Switch>
          </BrowserRouter>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
