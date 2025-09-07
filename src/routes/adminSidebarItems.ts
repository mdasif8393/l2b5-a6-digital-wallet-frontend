import AgentStatus from "@/components/modules/Admin/AgentStatus";
import AllUsers from "@/components/modules/Admin/AllUsers";
import { ISidebarItem } from "@/components/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Manage Users",
    items: [
      {
        title: "All Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
    ],
  },
  {
    title: "Manage Agents",
    items: [
      {
        title: "Agent Status",
        url: "/admin/agent-status",
        component: AgentStatus,
      },
    ],
  },
];
