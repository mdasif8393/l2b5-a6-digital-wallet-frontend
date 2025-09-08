import UserDashboardBanner from "@/components/modules/Users/UserDashboardBanner";
import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";

export default function UserWallet() {
  const { data: walletData } = useGetMyWalletQuery(undefined);
  console.log(walletData?.data);

  const { data: transactionData } = useGetMyTransactionQuery({
    limit: 5,
    fields: "-createdAt",
  });
  console.log(transactionData);

  return (
    <div>
      <div>
        <UserDashboardBanner />
      </div>
      <div></div>
    </div>
  );
}
