import WithdrawMoney from "@/components/modules/Agent/WithdrawMoney";
import MyWallet from "@/components/modules/Users/UserWallet";
import { ISidebarItem } from "@/components/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Transaction",
    items: [
      {
        title: "Withdraw Money",
        url: "/agent/withdraw-money",
        component: WithdrawMoney,
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "My Wallet",
        url: "/agent/my-wallet",
        component: MyWallet,
      },
    ],
  },
];
