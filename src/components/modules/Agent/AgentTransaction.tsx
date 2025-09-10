/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/layout/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AgentTransaction() {
  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const handleLimit = (value: string) => {
    setLimit(Number(value));
  };

  const [transactionType, setTransactionType] = useState<string | null>(null);

  const handleTypeChange = (value: string) => {
    setTransactionType(value);
  };

  const { data, isLoading } = useGetMyTransactionQuery({
    page: currentPage,
    limit,
    type: transactionType,
  });

  const totalPage = data?.meta?.totalPage || 1;

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-5">
        <div className="flex justify-center">
          <small className=" text-gray-400">
            A list of your latest Transactions history
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
      </div>

      {/** Pagination */}
      <div className="flex justify-between mt-2">
        {/* Filter */}
        <div>
          <Select onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Transaction Type</SelectLabel>
                <SelectItem value="CASH_IN">CASH_IN</SelectItem>
                <SelectItem value="WITHDRAW">WITHDRAW</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* limit */}
        <Select onValueChange={handleLimit}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select Page Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              {/* <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* pagination */}
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    <PaginationLink isActive={page === currentPage}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
