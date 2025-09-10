import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/components/utils/generateRoutes";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/components/utils/withAuth";
import { role } from "@/constants/role";
import { TRole } from "@/components/types";
import Homepage from "@/pages/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.admin as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/all-transactions-info" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/agent",
    Component: withAuth(DashboardLayout, role.agent as TRole),
    children: [
      { index: true, element: <Navigate to="/agent/my-wallet" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: [
      { index: true, element: <Navigate to="/user/my-wallet" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
// all-users
