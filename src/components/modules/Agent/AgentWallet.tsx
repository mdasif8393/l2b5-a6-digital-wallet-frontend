/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/layout/Loading";
import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import AgentDashboardBanner from "./AgentDashboardBanner";

export default function AgentWallet() {
  const { data, isLoading } = useGetMyTransactionQuery({
    limit: 10,
    sort: "-createdAt",
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <AgentDashboardBanner />
      </div>
      <div className="mt-5">
        <div className="flex justify-center">
          <small className=" text-gray-400">
            A list of our latest Transactions history
          </small>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-red-500">Transaction id</TableHead>
              <TableHead className="text-red-500">Amount</TableHead>
              <TableHead className="text-red-500">Type</TableHead>
              <TableHead className="text-red-500">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {item.transactionId}
                </TableCell>
                <TableCell className="font-medium">
                  <span className="font-extrabold">&#2547; </span>
                  {item.amount}
                </TableCell>
                <TableCell className="font-medium">{item.type}</TableCell>
                <TableCell className="font-medium">
                  {item.createdAt.split("T")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center">
          <Link to="/agent/transactions">
            <Button variant="link" className="hover:cursor-pointer">
              See All Transactions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
