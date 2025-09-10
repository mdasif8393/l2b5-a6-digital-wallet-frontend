/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/layout/Loading";
import { Badge } from "@/components/ui/badge";
import { useGetAllTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { useGetUsersQuery } from "@/redux/features/user/user.api";
import React from "react";

export default function AdminDashboardBanner() {
  const { data: usersData, isLoading: usersIsLoading } =
    useGetUsersQuery(undefined);

  const { data: transactionsData, isLoading: transactionsIsLoading } =
    useGetAllTransactionQuery(undefined);

  console.log(transactionsData);

  const usersInfo = usersData?.data?.filter(
    (user: any) => user.role === "USER"
  );

  const agentsInfo = usersData?.data?.filter(
    (user: any) => user.role === "AGENT"
  );

  if (usersIsLoading || transactionsIsLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-muted text-foreground px-4 py-3 text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <Badge className="font-bold">
            Total User:<span>{usersInfo?.length}</span>
          </Badge>
          <Badge className="font-bold">
            Total Agent:<span>{agentsInfo?.length}</span>
          </Badge>
          <Badge className="font-bold">
            Total Transactions:<span>{transactionsData?.meta?.total}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}
