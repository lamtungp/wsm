import React from 'react';

const Departments = React.lazy(() => import('../views/pages/admin/departments/Departments'));
const Users = React.lazy(() => import('../views/pages/admin/users/Users'));
const FormUser = React.lazy(() => import('../views/pages/admin/users/FormUser'));

const Login = React.lazy(() => import('../views/pages/login/Login'));
const StaffsOfDepartment = React.lazy(() => import('../views/pages/admin/departments/StaffsOfDepartment'));
const FormDepartment = React.lazy(() => import('../views/pages/admin/departments/FormDepartment'));
const Requestings = React.lazy(() => import('../views/pages/admin/requestings/Requestings'));
const Password = React.lazy(() => import('../views/pages/admin/password/Password'));
const ResetPassword = React.lazy(() => import('../views/pages/admin/password/ResetPassword'));
// const RequestsPending = React.lazy(() => import('../views/pages/admin/requestings/RequestsPending'));
// const RequestsDeclined = React.lazy(() => import('../views/pages/admin/requestings/RequestsDeclined'));

const routes = [
    { path: '/admin', exact: true, name: 'Home', component: Users },
    { path: '/admin/login', name: 'Home', component: Login },
    { path: '/admin/users', name: 'Users', component: Users, exact: true },
    { path: '/admin/users/add-user', name: 'AddUser', component: FormUser },
    { path: '/admin/users/update-user/:id', name: 'UpdateUser', component: FormUser },
    { path: '/admin/departments', name: 'Departments', component: Departments, exact: true },
    { path: '/admin/staffs-department/:departmentId', name: 'StaffsOfDepartment', component: StaffsOfDepartment },
    { path: '/admin/departments/add-department', name: 'AddDepartment', component: FormDepartment },
    { path: '/admin/departments/update-department/:id', name: 'FormDepartment', component: FormDepartment },
    { path: '/admin/requestings', name: 'Requestings', component: Requestings, exact: true },
    { path: '/admin/resetpassword', name: 'Password', component: Password, exact: true },
    { path: '/admin/resetpassword/:id', name: 'ResetPassword', component: ResetPassword },
    // { path: '/admin/requestings/pending', name: 'RequestsPending', component: RequestsPending },
    // { path: '/admin/requestings/declined', name: 'RequestsDeclined', component: RequestsDeclined },
];

export default routes;
