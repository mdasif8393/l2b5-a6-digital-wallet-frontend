import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AgentStatus from "@/components/modules/Admin/AgentStatus";
import AllUsers from "@/components/modules/Admin/AllUsers";
import WithdrawMoney from "@/components/modules/Agent/WithdrawMoney";
import AddMoney from "@/components/modules/Users/AddMoney";
import MyWallet from "@/components/modules/Users/MyWallet";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

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
    children: [
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "agent-status",
        Component: AgentStatus,
      },
    ],
  },
  {
    path: "/agent",
    Component: DashboardLayout,
    children: [
      {
        path: "withdraw-money",
        Component: WithdrawMoney,
      },
      {
        path: "my-wallet",
        Component: MyWallet,
      },
    ],
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: [
      {
        path: "add-money",
        Component: AddMoney,
      },
      {
        path: "my-wallet",
        Component: MyWallet,
      },
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
]);
