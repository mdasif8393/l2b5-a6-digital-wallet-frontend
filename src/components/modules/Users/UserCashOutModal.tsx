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
import { useCashOutMutation } from "@/redux/features/wallet/wallet.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const cashOutSchema = z.object({
  amount: z.coerce.number(),
  agentId: z.string(),
});

type CashOutSchema = z.infer<typeof cashOutSchema>;

export function UserCashOutModal() {
  const [open, setOpen] = useState(false);

  const { data: currentUserData, isLoading: currentUserLoading } =
    useUserInfoQuery(undefined);

  const { data: agentsInfo, isLoading: agentInfoLoading } = useGetUsersQuery({
    role: "AGENT",
    isActive: "ACTIVE",
    isDeleted: false,
    agentStatus: "APPROVED",
  });

  const [cashOut] = useCashOutMutation();

  const filteredAgentsInfo = agentsInfo?.data?.filter(
    (user: any) => user._id !== currentUserData?.data?._id
  );

  const agentsEmailOptions = filteredAgentsInfo?.map(
    (user: { _id: string; email: string }) => ({
      value: user._id,
      label: user.email,
    })
  );

  const form = useForm<CashOutSchema>({
    resolver: zodResolver(cashOutSchema) as Resolver<CashOutSchema>,
    defaultValues: {
      amount: 500,
      agentId: "",
    },
  });

  const onSubmit = async (data: CashOutSchema) => {
    if (!data?.agentId) {
      toast.error("Please, select receiver email");
      return;
    }

    const cashOutInfo = {
      amountData: {
        amount: data?.amount,
      },
      receiverId: data?.agentId,
    };
    try {
      const res = await cashOut(cashOutInfo).unwrap();
      if (res.success) {
        toast.success("Cash Out successfully");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (currentUserLoading || agentInfoLoading) {
    return <Loading />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="hover:cursor-pointer">
            Cash Out
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cash Out</DialogTitle>
            <DialogDescription>Cash out from agent</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form id="cash-out" onSubmit={form.handleSubmit(onSubmit)}>
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
                name="agentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a agent to cash out" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agentsEmailOptions?.map(
                          (option: { value: string; label: string }) => (
                            <SelectItem
                              disabled={agentInfoLoading}
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
            <Button type="submit" form="cash-out">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
