import AdminManageAgents from "@/components/modules/Admin/AdminManageAgents";
import AdminManageUsers from "@/components/modules/Admin/AdminManageUsers";
import AdminTransactions from "@/components/modules/Admin/AdminTransactions";

import { ISidebarItem } from "@/components/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Transactions Management",
    items: [
      {
        title: "Transactions",
        url: "/admin/all-transactions-info",
        component: AdminTransactions,
      },
    ],
  },
  {
    title: "Users Managements",
    items: [
      {
        title: "Users",
        url: "/admin/manage-users",
        component: AdminManageUsers,
      },
      {
        title: "Agents",
        url: "/admin/manage-agents",
        component: AdminManageAgents,
      },
    ],
  },
  {
    title: "Profile Management",
    items: [
      {
        title: "Update Profile",
        url: "/admin/update-admin",
        component: AdminManageUsers,
      },
    ],
  },
];
