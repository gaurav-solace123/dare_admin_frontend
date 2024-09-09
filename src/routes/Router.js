import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ForgotPassword from '../views/authentication/ForgotPassword';
import ResetPassword from '../views/authentication/ResetPassword';
import StudentReport from '../views/studentReport/StudentReport';
import PrivateRoute from './PrivateRoute';
import Middle from '../views/studentReport/MiddleSchool';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const UsersList = Loadable(lazy(() => import('../views/users/UsersList')))
const AddEditUser = Loadable(lazy(() => import('../views/users/AddEditUser')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const StudentManagement = Loadable(lazy(() => import('../views/studentManagement/StudentManagement')));
const InstructorManagement = Loadable(lazy(() => import('../views/instructorManagement/InstructorManagement')));
const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      {
        path: '/dashboard',
        element: <PrivateRoute element={<Dashboard />} />
      },
      {
        path: '/users',
        element: <PrivateRoute element={<UsersList />} />
      },
      {
        path: '/users/add-user',
        element: <PrivateRoute element={<AddEditUser />} />
      },
      {
        path: '/users/edit-user',
        element: <PrivateRoute element={<AddEditUser />} />
      },
      { path: '/studentmanagement', exact: true, element: <PrivateRoute element={<StudentManagement />}/> },
      { path: '/instructormanagement', exact: true, element: <PrivateRoute element={<InstructorManagement />}/> },
      { path: '/studentReport', exact: true, element: <PrivateRoute element={<StudentReport />}/> },
      { path: '/middleStudentReport', exact: true, element: <PrivateRoute element={<Middle />}/> },
      { path: '/sample-page', element: <SamplePage /> },
      { path: '/icons', element: <Icons /> },
      { path: '/ui/typography', element: <TypographyPage /> },
      { path: '/ui/shadow', element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      {
        path: '/auth/forgot-password/:token',
        element: <ResetPassword />,
      },
      { path: '/auth/forgotPassword', element: <ForgotPassword /> },
      { path: '/auth/resetPassword', element: <ResetPassword /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;

