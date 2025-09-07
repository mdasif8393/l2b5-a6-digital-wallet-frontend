import { role } from "@/constants/role";
import { TRole } from "../types";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";

// make dynamic side bar data based on user role
export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.agent:
      return [...agentSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};
