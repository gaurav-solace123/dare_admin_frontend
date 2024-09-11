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
  {
    id: uniqueId(),
    title: 'Student Report',
    icon: IconUserPlus,
    href: '/studentReport',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Middle Student Report',
  //   icon: IconUserPlus,
  //   href: '/middleStudentReport',
  // },

  {
    navlabel: true,
    subheader: 'Mangment',
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
  // {
  //   navlabel: true,
  //   subheader: 'Utilities',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Typography',
  //   icon: IconTypography,
  //   href: '/ui/typography',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/ui/shadow',
  // },
  
];

export default Menuitems;
