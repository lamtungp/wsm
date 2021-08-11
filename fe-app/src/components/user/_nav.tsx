import React from 'react';
import { FaShareSquare, FaWindowMaximize, FaCalendarCheck, FaClipboard } from 'react-icons/fa';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Lịch làm việc',
    to: '/',
    icon: <FaWindowMaximize style={{ marginRight: '1rem', color: 'lightgray' }} />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Các yêu cầu',
    route: '/requests',
    icon: <FaShareSquare style={{ marginRight: '1rem' }} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Yêu cầu của tôi',
        to: '/user/requests',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Yêu cầu cần duyệt',
        to: '/user/member/requests',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sach nhân viên cấp dưới',
    to: '/user/list_staff',
    icon: <FaCalendarCheck style={{ marginRight: '1rem' }} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Thống kê giờ làm việc',
    to: '/user/working_hours',
    icon: <FaClipboard style={{ marginRight: '1rem' }} />,
  },
];

export default _nav;
