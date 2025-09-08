import UpdateUserProfile from "@/components/modules/Users/UpdateUserProfile";
import UserTransaction from "@/components/modules/Users/UserTransaction";
import { ISidebarItem } from "@/components/types";
import UserWallet from "@/components/modules/Users/UserWallet";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Wallet",
    items: [
      {
        title: "My Wallet",
        url: "/user/my-wallet",
        component: UserWallet,
      },
    ],
  },
  {
    title: "Transaction",
    items: [
      {
        title: "Transactions",
        url: "/user/transactions",
        component: UserTransaction,
      },
    ],
  },
  {
    title: "Profile Management",
    items: [
      {
        title: "Update Profile",
        url: "/user/update-user",
        component: UpdateUserProfile,
      },
    ],
  },
];
