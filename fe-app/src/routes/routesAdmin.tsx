import React from 'react';

const Rooms = React.lazy(() => import('../views/admin/rooms/Rooms'));
const Users = React.lazy(() => import('../views/admin/users/Users'));
const Login = React.lazy(() => import('../views/pages/login/Login'));
const StaffsOfRoom = React.lazy(() => import('../views/admin/rooms/StaffsOfRoom'));
const FormRoom = React.lazy(() => import('../views/admin/rooms/FormRoom'));
const FormUser = React.lazy(() => import('../views/admin/users/FormUser'));

const routes = [
    { path: '/admin', exact: true, name: 'Home', component: Users },
    { path: '/admin/login', name: 'Home', component: Login },
    { path: '/admin/users', name: 'Users', component: Users, exact: true },
    { path: '/admin/rooms', name: 'Rooms', component: Rooms, exact: true },
    { path: '/admin/staffs-room/:id', name: 'StaffsOfRoom', component: StaffsOfRoom },
    { path: '/admin/rooms/add-room', name: 'FormRoom', component: FormRoom },
    { path: '/admin/users/add-user', name: 'FormUser', component: FormUser },
    // { path: '/admin/requests', name: 'Users', component: Requests, exact: true },
    // { path: '/user/users/update-user/:id', name: 'UpdateUser', component: FormUser },
    // { path: '/user/users/add-user', name: 'AddUser', component: FormUser },
];

export default routes;
