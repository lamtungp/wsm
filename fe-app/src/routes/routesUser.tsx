import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/Dashboard'));
const Requests = React.lazy(() => import('../views/user/request/Requests'));
const Login = React.lazy(() => import('../views/pages/login/Login'));
const FormRequest = React.lazy(() => import('../views/user/request/FormRequest'));
const RequestDetails = React.lazy(() => import('../views/user/request/RequestDetails'));
const Requestings = React.lazy(() => import('../views/user/requestings/Requestings'));
const Information = React.lazy(() => import('../views/user/information/Information'));
const FormInformation = React.lazy(() => import('../views/user/information/FormInformation'));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Dashboard },
    { path: '/login', name: 'Home', component: Login },
    { path: '/user', name: 'User', component: Dashboard, exact: true },
    { path: '/user/requests', name: 'Requests', component: Requests, exact: true },
    { path: '/user/requests/new', name: 'AddRequest', component: FormRequest },
    { path: '/user/requests/:id', name: 'RequestDetails', component: RequestDetails, exact: true },
    { path: '/user/requests/:id/edit', name: 'UpdateRequest', component: FormRequest },
    { path: '/user/member/requests', name: 'Requestings', component: Requestings },
    { path: '/user/profile', name: 'Information', component: Information, exact: true },
    { path: '/user/profile/edit', name: 'FormInformation', component: FormInformation, exact: true },
];

export default routes;
