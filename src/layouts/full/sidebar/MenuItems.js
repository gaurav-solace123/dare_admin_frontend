import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
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
    icon: IconLayoutDashboard,
    href: '/student-management',
  },
  {
    id: uniqueId(),
    title: 'Instructor Management',
    icon: IconUserPlus,
    href: '/instructor-management',
  },
  {
    id: uniqueId(),
    title: 'Facilator Management',
    icon: IconUserPlus,
    href: '/facilator-management',
  },
  {
    navlabel: true,
    subheader: 'Reports',
  },
  {
    id: uniqueId(),
    title: 'Student Report',
    icon: IconUserPlus,
    href: '/student-report',
  },
  {
    id: uniqueId(),
    title: 'Instructor Report',
    icon: IconCopy,
    href: '/instructor-report',
  },
  
];

export default Menuitems;
