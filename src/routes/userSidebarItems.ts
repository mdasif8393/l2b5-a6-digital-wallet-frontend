import AddMoney from "@/components/modules/Users/AddMoney";
import MyWallet from "@/components/modules/Users/MyWallet";
import { ISidebarItem } from "@/components/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Transaction",
    items: [
      {
        title: "Add Money",
        url: "/user/add-money",
        component: AddMoney,
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "My Wallet",
        url: "/user/my-wallet",
        component: MyWallet,
      },
    ],
  },
];
