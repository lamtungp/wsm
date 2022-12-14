import React from 'react';
import { FaShareSquare, FaWindowMaximize, FaCalendarCheck, FaUsers, FaHome } from 'react-icons/fa';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin',
    icon: <FaHome style={{ marginRight: '1rem', color: 'lightgray' }} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý phòng ban',
    to: '/admin/departments',
    icon: <FaWindowMaximize style={{ marginRight: '1rem', color: 'lightgray' }} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lý nhân viên',
    to: '/admin/users',
    icon: <FaUsers style={{ marginRight: '1rem' }} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Reset mật khẩu',
    to: '/admin/resetpassword',
    icon: <FaCalendarCheck style={{ marginRight: '1rem' }} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Yêu cầu cần duyệt',
    to: '/admin/requestings',
    icon: <FaShareSquare style={{ marginRight: '1rem' }} />,
  },
];

export default _nav;
