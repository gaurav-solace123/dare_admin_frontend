import {
  IconGridDots ,IconFileText , IconReport , IconLayoutDashboard, IconUsers, IconUser , IconReportAnalytics, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUserPlus,
    href: '/users',
  },
  
  // {
  //   id: uniqueId(),
  //   title: 'Middle Student Report',
  //   icon: IconUserPlus,
  //   href: '/middleStudentReport',
  // },

  {
    navlabel: true,
    subheader: 'Management',
  },

  {
    id: uniqueId(),
    title: 'Student Management',
    icon: IconGridDots,
    href: '/student-management',
  },
  {
    id: uniqueId(),
    title: 'Instructor Management',
    icon: IconUsers,
    href: '/instructor-management',
  },
  {
    id: uniqueId(),
    title: 'Facilator Management',
    icon: IconUser,
    href: '/facilator-management',
  },
  {
    id: uniqueId(),
    title: 'Content Management',
    icon: IconFileText ,
    href: '/content-management',
  },
  {
    navlabel: true,
    subheader: 'Reports',
  },
  {
    id: uniqueId(),
    title: 'Student Report',
    icon: IconReport,
    href: '/student-report',
  },
  {
    id: uniqueId(),
    title: 'Instructor Report',
    icon: IconReportAnalytics,
    href: '/instructor-report',
  },
  
];

export default Menuitems;
