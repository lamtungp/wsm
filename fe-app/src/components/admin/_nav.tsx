import React from 'react';
import { FaShareSquare, FaWindowMaximize, FaCalendarCheck, FaClipboard } from 'react-icons/fa';

const _nav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Quản lý phòng ban',
        to: '/admin/rooms',
        icon: <FaWindowMaximize style={{ marginRight: '1rem', color: 'lightgray' }} />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Quản lý nhân viên',
        to: '/admin/staffs',
        icon: <FaShareSquare style={{ marginRight: '1rem' }} />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Thay đổi mật khẩu',
        to: '/admin/resetpassword',
        icon: <FaCalendarCheck style={{ marginRight: '1rem' }} />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Yêu cầu cần duyệt',
        to: '/admin/requests',
        icon: <FaClipboard style={{ marginRight: '1rem' }} />,
    },
];

export default _nav;
