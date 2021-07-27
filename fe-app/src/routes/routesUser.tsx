import React from 'react';

const Checked = React.lazy(() => import('../views/pages/user/checkin/Checkin'));
const Requests = React.lazy(() => import('../views/pages/user/request/Requests'));
const Login = React.lazy(() => import('../views/pages/login/Login'));
const FormRequest = React.lazy(() => import('../views/pages/user/request/FormRequest'));
const RequestDetails = React.lazy(() => import('../views/pages/user/request/RequestDetails'));
const Requestings = React.lazy(() => import('../views/pages/user/requestings/Requestings'));
const RequestingDetails = React.lazy(() => import('../views/pages/user/requestings/RequestingDetails'));
const Information = React.lazy(() => import('../views/pages/user/information/Information'));
const FormInformation = React.lazy(() => import('../views/pages/user/information/FormInformation'));
const ListStaff = React.lazy(() => import('../views/pages/user/list_staff/ListStaff'));
const WorkingHours = React.lazy(() => import('../views/pages/user/working_hours/WorkingHours'));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Checked },
    { path: '/login', name: 'Home', component: Login },
    { path: '/user', name: 'User', component: Checked, exact: true },
    { path: '/user/requests', name: 'Requests', component: Requests, exact: true },
    { path: '/user/requests/new', name: 'AddRequest', component: FormRequest },
    { path: '/user/requests/:id', name: 'RequestDetails', component: RequestDetails, exact: true },
    { path: '/user/requests/:id/edit', name: 'UpdateRequest', component: FormRequest },
    { path: '/user/member/requests', name: 'Requestings', component: Requestings, exact: true },
    { path: '/user/member/requests/:option', name: 'RequestingDetails', component: RequestingDetails },
    { path: '/user/profile', name: 'Information', component: Information, exact: true },
    { path: '/user/profile/edit', name: 'FormInformation', component: FormInformation, exact: true },
    { path: '/user/list_staff', name: 'ListStaff', component: ListStaff },
    { path: '/user/working_hours', name: 'WorkingHours', component: WorkingHours },
];

export default routes;
