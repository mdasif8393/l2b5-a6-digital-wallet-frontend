/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Input } from "@/components/ui/input";
import { useGetUsersQuery } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import Loading from "@/components/layout/Loading";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { toast } from "sonner";
import { useState } from "react";

const sendMoneySchema = z.object({
  amount: z.coerce.number(),
  receiverId: z.string(),
});

type SendMoneySchema = z.infer<typeof sendMoneySchema>;

export function UserSendMoneyModal() {
  const [open, setOpen] = useState(false);

  const { data: currentUserData, isLoading: currentUserLoading } =
    useUserInfoQuery(undefined);

  const { data: usersInfo, isLoading: userInfoLoading } = useGetUsersQuery({
    role: "USER",
    isActive: "ACTIVE",
    isDeleted: false,
  });

  const [sendMoney] = useSendMoneyMutation();

  const filteredUsersInfo = usersInfo?.data?.filter(
    (user: any) => user._id !== currentUserData?.data?._id
  );

  const usersEmailOptions = filteredUsersInfo?.map(
    (user: { _id: string; email: string }) => ({
      value: user._id,
      label: user.email,
    })
  );

  const form = useForm<SendMoneySchema>({
    resolver: zodResolver(sendMoneySchema) as Resolver<SendMoneySchema>,
    defaultValues: {
      amount: 500,
      receiverId: "",
    },
  });

  const onSubmit = async (data: SendMoneySchema) => {
    if (!data?.receiverId) {
      toast.error("Please, select receiver email");
      return;
    }

    const sendMoneyInfo = {
      amountData: {
        amount: data?.amount,
      },
      receiverId: data?.receiverId,
    };
    console.log(sendMoneyInfo);
    try {
      const res = await sendMoney(sendMoneyInfo).unwrap();
      if (res.success) {
        toast.success("Send money successfully");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (currentUserLoading || userInfoLoading) {
    return <Loading />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="hover:cursor-pointer">
            Send Money
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Money</DialogTitle>
            <DialogDescription>Send Money to another User</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form id="send-money" onSubmit={form.handleSubmit(onSubmit)}>
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
                name="receiverId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a receiver to send money" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {usersEmailOptions?.map(
                          (option: { value: string; label: string }) => (
                            <SelectItem
                              disabled={userInfoLoading}
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
            <Button type="submit" form="send-money">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
