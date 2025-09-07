import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/components/utils/generateRoutes";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/agent",
    Component: DashboardLayout,
    children: [...generateRoutes(agentSidebarItems)],
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: [...generateRoutes(userSidebarItems)],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
