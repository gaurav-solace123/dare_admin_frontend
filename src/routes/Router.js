import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import InstructorPreview from "../views/users/intructors/InstrutorsDetails";


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const UsersList = Loadable(lazy(() => import("../views/users/UsersList")));
const AddEditUser = Loadable(lazy(() => import("../views/users/AddEditUser")));
const ForgotPassword = Loadable(
  lazy(() => import("../views/authentication/ForgotPassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("../views/authentication/ResetPassword"))
);
const StudentReport = Loadable(
  lazy(() => import("../views/studentReport/StudentReport"))
);
const PrivateRoute = Loadable(lazy(() => import("./PrivateRoute")));
const InstructorReport = Loadable(
  lazy(() => import("../views/instructor_report"))
);
const StudentDetails = Loadable(
  lazy(() => import("../views/users/students/StudentDetails"))
);

const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Login = Loadable(lazy(() => import("../views/authentication/Login")));
const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      {
        path: "/dashboard",
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "/users",
        element: <PrivateRoute element={<UsersList />} />,
      },
      {
        path: "/users/add-user",
        element: <PrivateRoute element={<AddEditUser />} />,
      },
      {
        path: "/users/edit-user",
        element: <PrivateRoute element={<AddEditUser />} />,
      },
      {
        path: "/student-management",
        exact: true,
        element: (
          <PrivateRoute element={<UsersList role="Student" key="student" />} />
        ),
      },
      {
        path: "/student-details",
        exact: true,
        element: <PrivateRoute element={<StudentDetails />} />,
      },
      {
        path: "/instructor-management",
        exact: true,
        element: (
          <PrivateRoute
            element={<UsersList role="Instructor" key="instructor" />}
          />
        ),
      },
      {
        path: "/instructor-details",
        exact: true,
        element: <PrivateRoute element={<InstructorPreview />} />,
      },
      {
        path: "/facilator-management",
        exact: true,
        element: (
          <PrivateRoute
            element={<UsersList role="Facilitator" key="facilitator" />}
          />
        ),
      },
      {
        path: "/student-report",
        exact: true,
        element: <PrivateRoute element={<StudentReport />} />,
      },
      {
        path: "/instructor-report",
        exact: true,
        element: <PrivateRoute element={<InstructorReport />} />,
      },

      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/login", element: <Login /> },
      {
        path: "/auth/forgot-password/:token",
        element: <ResetPassword />,
      },
      { path: "/auth/forgotPassword", element: <ForgotPassword /> },
      { path: "/auth/resetPassword", element: <ResetPassword /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
