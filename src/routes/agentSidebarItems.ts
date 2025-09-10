import AgentTransaction from "@/components/modules/Agent/AgentTransaction";
import AgentWallet from "@/components/modules/Agent/AgentWallet";
import UpdateAgentProfile from "@/components/modules/Agent/UpdateAgentProfile";

import { ISidebarItem } from "@/components/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Wallet",
    items: [
      {
        title: "My Wallet",
        url: "/agent/my-wallet",
        component: AgentWallet,
      },
    ],
  },
  {
    title: "Transaction",
    items: [
      {
        title: "Transactions",
        url: "/agent/transactions",
        component: AgentTransaction,
      },
    ],
  },
  {
    title: "Profile Management",
    items: [
      {
        title: "Update Profile",
        url: "/agent/update-user",
        component: UpdateAgentProfile,
      },
    ],
  },
];
