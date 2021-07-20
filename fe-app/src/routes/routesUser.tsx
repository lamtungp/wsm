import React from 'react';

const Checked = React.lazy(() => import('../views/pages/user/dashboard/Dashboard'));
const Requests = React.lazy(() => import('../views/pages/user/request/Requests'));
const Login = React.lazy(() => import('../views/pages/login/Login'));
const FormRequest = React.lazy(() => import('../views/pages/user/request/FormRequest'));
const RequestDetails = React.lazy(() => import('../views/pages/user/request/RequestDetails'));
const Requestings = React.lazy(() => import('../views/pages/user/requestings/Requestings'));
const Information = React.lazy(() => import('../views/pages/user/information/Information'));
const FormInformation = React.lazy(() => import('../views/pages/user/information/FormInformation'));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Checked },
    { path: '/login', name: 'Home', component: Login },
    { path: '/user', name: 'User', component: Checked, exact: true },
    { path: '/user/requests', name: 'Requests', component: Requests, exact: true },
    { path: '/user/requests/new', name: 'AddRequest', component: FormRequest },
    { path: '/user/requests/:id', name: 'RequestDetails', component: RequestDetails, exact: true },
    { path: '/user/requests/:id/edit', name: 'UpdateRequest', component: FormRequest },
    { path: '/user/member/requests', name: 'Requestings', component: Requestings },
    { path: '/user/profile', name: 'Information', component: Information, exact: true },
    { path: '/user/profile/edit', name: 'FormInformation', component: FormInformation, exact: true },
];

export default routes;
