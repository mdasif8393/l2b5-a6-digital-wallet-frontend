import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import AgentWithdrawMoneyModal from "./AgentWithdrawMoneyModal";

export default function AgentDashboardBanner() {
  const { data: walletData } = useGetMyWalletQuery(undefined);
  const walletBalance = walletData?.data?.balance;
  return (
    <div className="bg-muted text-foreground px-4 py-3 text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <Badge className="font-bold">
            Balance: <span className="font-extrabold">&#2547;</span>
            <span>{walletBalance?.toFixed(2)}</span>
          </Badge>
        </div>
        <AgentWithdrawMoneyModal />
      </div>
    </div>
  );
}
