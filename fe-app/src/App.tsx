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
                            path="/admin"
                            render={() => {
                                return localStorage.getItem('token') &&
                                    localStorage.getItem('permission') === 'admin' ? (
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
                                    if (localStorage.getItem('permission') === 'user') return <Redirect to="/" />;
                                    else if (localStorage.getItem('permission') === 'admin')
                                        return <Redirect to="/admin" />;
                                    else return <Redirect to="/manager" />;
                                }
                                return <Login />;
                            }}
                        />
                        <Route path="/forgot-password" component={ResetPassword} />
                        <Route
                            path="/"
                            render={() => {
                                return localStorage.getItem('token') &&
                                    localStorage.getItem('permission') === 'user' ? (
                                    <LayoutUser />
                                ) : (
                                    <Redirect to="/login" />
                                );
                            }}
                        />
                        {/* <Route path="/admin" component={LayoutAdmin} /> */}
                    </Switch>
                </BrowserRouter>
            </React.Suspense>
        </div>
    );
};

export default App;
