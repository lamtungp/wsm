import { CSpinner } from '@coreui/react';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './assets/scss/admin/style.scss';

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

const App: React.FunctionComponent = (): React.ReactElement => {
    const wrapper = React.createRef();
    return (
        <div className="App" ref={wrapper as any}>
            <React.Suspense fallback={loading}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path="/login"
                            render={() => {
                                return localStorage.getItem('token') ? <Redirect to="/" /> : <Login />;
                            }}
                        />
                        <Route path="/forgot-password" component={ResetPassword} />
                        <Route
                            path="/"
                            render={() => {
                                return localStorage.getItem('token') ? <LayoutUser /> : <Redirect to="/login" />;
                            }}
                        />
                        <Route
                            path="/admin/login"
                            render={() => {
                                return localStorage.getItem('token') ? <Redirect to="/admin" /> : <Login />;
                            }}
                        />
                        <Route
                            path="/admin"
                            render={() => {
                                return localStorage.getItem('token') ? <LayoutAdmin /> : <Redirect to="/admin/login" />;
                            }}
                        />
                    </Switch>
                </BrowserRouter>
            </React.Suspense>
        </div>
    );
};

export default App;
