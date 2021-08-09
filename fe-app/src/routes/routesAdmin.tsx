import React from 'react';

const Login = React.lazy(() => import('../views/pages/login/Login'));
const Dashboard = React.lazy(() => import('../views/pages/admin/dashboard/Dashboard'));
const Users = React.lazy(() => import('../views/pages/admin/users/Users'));
const FormUser = React.lazy(() => import('../views/pages/admin/users/FormUser'));
const Departments = React.lazy(() => import('../views/pages/admin/departments/Departments'));
const StaffsOfDepartment = React.lazy(() => import('../views/pages/admin/departments/StaffsOfDepartment'));
const FormDepartment = React.lazy(() => import('../views/pages/admin/departments/FormDepartment'));
const Password = React.lazy(() => import('../views/pages/admin/password/Password'));
const Requestings = React.lazy(() => import('../views/pages/admin/requestings/Requestings'));
const RequestingDetails = React.lazy(() => import('../views/pages/admin/requestings/RequestingDetails'));
const Information = React.lazy(() => import('../views/pages/admin/information/Information'));
const FormInformation = React.lazy(() => import('../views/pages/admin/information/FormInformation'));

const routes = [
    { path: '/admin', name: 'Dashboard', component: Dashboard, exact: true },
    { path: '/admin/login', name: 'Login', component: Login },
    { path: '/admin/profile', name: 'Information', component: Information, exact: true },
    { path: '/admin/profile', name: 'FormInformation', component: FormInformation },
    { path: '/admin/users', name: 'Users', component: Users, exact: true },
    { path: '/admin/users/add-user', name: 'AddUser', component: FormUser },
    { path: '/admin/users/update-user/:email', name: 'UpdateUser', component: FormUser },
    { path: '/admin/departments', name: 'Departments', component: Departments, exact: true },
    { path: '/admin/staffs-department/:departmentId', name: 'StaffsOfDepartment', component: StaffsOfDepartment },
    { path: '/admin/departments/add-department', name: 'AddDepartment', component: FormDepartment },
    { path: '/admin/departments/update-department/:id', name: 'FormDepartment', component: FormDepartment },
    { path: '/admin/resetpassword', name: 'Password', component: Password, exact: true },
    { path: '/admin/requestings', name: 'Requestings', component: Requestings, exact: true },
    { path: '/admin/requestings/:option', name: 'RequestingDetails', component: RequestingDetails },
];

export default routes;
