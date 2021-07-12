import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/Dashboard'));
const Requests = React.lazy(() => import('../views/user/request/Requests'));
const Login = React.lazy(() => import('../views/pages/login/Login'));

const routes = [
    { path: '/admin', exact: true, name: 'Home', component: Dashboard },
    { path: '/admin/login', name: 'Home', component: Login },
    { path: '/admin/user', name: 'User', component: Dashboard, exact: true },
    { path: '/admin/requests', name: 'Users', component: Requests, exact: true },
    // { path: '/user/users/update-user/:id', name: 'UpdateUser', component: FormUser },
    // { path: '/user/users/add-user', name: 'AddUser', component: FormUser },
];

export default routes;
