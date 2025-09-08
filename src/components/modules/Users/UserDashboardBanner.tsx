import { Button } from "@/components/ui/button";
import { Badge } from "../../ui/badge";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";

export default function UserDashboardBanner() {
  const { data: walletData } = useGetMyWalletQuery(undefined);
  const walletBalance = walletData?.data?.balance;

  return (
    <div className="bg-muted text-foreground px-4 py-3 text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <Badge>
            Balance: <span>&#2547;</span>
            {walletBalance?.toFixed(2)}
          </Badge>
        </div>
        <Button>Add Money</Button>
        <Button>Send Money</Button>
        <Button>Cash Out</Button>
      </div>
    </div>
  );
}
