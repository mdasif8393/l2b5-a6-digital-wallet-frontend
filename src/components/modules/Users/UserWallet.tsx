import UserDashboardBanner from "@/components/modules/Users/UserDashboardBanner";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";

export default function UserWallet() {
  const { data: walletData } = useGetMyWalletQuery(undefined);
  console.log(walletData?.data);

  return (
    <div>
      <div>
        <UserDashboardBanner />
      </div>
    </div>
  );
}
