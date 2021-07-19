import React from 'react';

const Departments = React.lazy(() => import('../views/admin/departments/Departments'));
const Users = React.lazy(() => import('../views/admin/users/Users'));
const Login = React.lazy(() => import('../views/pages/login/Login'));
const StaffsOfDepartment = React.lazy(() => import('../views/admin/departments/StaffsOfDepartment'));
const FormDepartment = React.lazy(() => import('../views/admin/departments/FormDepartment'));
const FormUser = React.lazy(() => import('../views/admin/users/FormUser'));
const Requestings = React.lazy(() => import('../views/admin/requestings/Requestings'));

const routes = [
    { path: '/admin', exact: true, name: 'Home', component: Users },
    { path: '/admin/login', name: 'Home', component: Login },
    { path: '/admin/users', name: 'Users', component: Users, exact: true },
    { path: '/admin/users/add-user', name: 'FormUser', component: FormUser },
    { path: '/admin/departments', name: 'Departments', component: Departments, exact: true },
    { path: '/admin/staffs-department/:departmentId', name: 'StaffsOfDepartment', component: StaffsOfDepartment },
    { path: '/admin/departments/add-department', name: 'FormDepartment', component: FormDepartment },
    { path: '/admin/requestings', name: 'Requestings', component: Requestings, exact: true },
    // { path: '/admin/requests', name: 'Users', component: Requests, exact: true },
    // { path: '/user/users/update-user/:id', name: 'UpdateUser', component: FormUser },
    // { path: '/user/users/add-user', name: 'AddUser', component: FormUser },
];

export default routes;
