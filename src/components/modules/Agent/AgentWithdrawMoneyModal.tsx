/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetUsersQuery } from "@/redux/features/user/user.api";
import {
  useCashOutMutation,
  useWithdrawMoneyMutation,
} from "@/redux/features/wallet/wallet.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const withdrawMoneySchema = z.object({
  amount: z.coerce.number(),
  userId: z.string(),
});

type WithdrawMoneySchema = z.infer<typeof withdrawMoneySchema>;

export default function AgentWithdrawMoneyModal() {
  const [open, setOpen] = useState(false);

  const { data: currentUserData, isLoading: currentUserLoading } =
    useUserInfoQuery(undefined);

  const { data: usersInfo, isLoading: usersInfoLoading } = useGetUsersQuery({
    role: "USER",
    isActive: "ACTIVE",
    isDeleted: false,
  });

  const [withdrawMoney] = useWithdrawMoneyMutation();

  const filteredUsersInfo = usersInfo?.data?.filter(
    (user: any) => user._id !== currentUserData?.data?._id
  );

  const usersEmailOptions = filteredUsersInfo?.map(
    (user: { _id: string; email: string }) => ({
      value: user._id,
      label: user.email,
    })
  );

  const form = useForm<WithdrawMoneySchema>({
    resolver: zodResolver(withdrawMoneySchema) as Resolver<WithdrawMoneySchema>,
    defaultValues: {
      amount: 100,
      userId: "",
    },
  });

  const onSubmit = async (data: WithdrawMoneySchema) => {
    if (!data?.userId) {
      toast.error("Please, select user email");
      return;
    }

    const withDrawMoneyInfo = {
      amountData: {
        amount: data?.amount,
      },
      receiverId: data?.userId,
    };
    try {
      const res = await withdrawMoney(withDrawMoneyInfo).unwrap();
      if (res.success) {
        toast.success("Withdraw money successfully from user wallet");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (currentUserLoading || usersInfoLoading) {
    return <Loading />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="hover:cursor-pointer">
            Withdraw Money From User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
            <DialogDescription>Withdraw Money from user</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form id="withdraw-money" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user to cash out" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {usersEmailOptions?.map(
                          (option: { value: string; label: string }) => (
                            <SelectItem
                              disabled={usersInfoLoading}
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link to="/examples/forms">email settings</Link>.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="withdraw-money">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
