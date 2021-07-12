import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/Dashboard'));
const Requests = React.lazy(() => import('../views/user/request/Requests'));
const Login = React.lazy(() => import('../views/pages/login/Login'));
const FormRequest = React.lazy(() => import('../views/user/request/FormRequest'));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Dashboard },
    { path: '/login', name: 'Home', component: Login },
    { path: '/user', name: 'User', component: Dashboard, exact: true },
    { path: '/user/requests', name: 'Requests', component: Requests, exact: true },
    { path: '/user/requests/new', name: 'AddRequest', component: FormRequest },
    // { path: '/user/users/add-user', name: 'AddUser', component: FormUser },
];

export default routes;
