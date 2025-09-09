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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const addMoneySchema = z.object({
  amount: z.coerce.number(),
});

type AddMoneySchema = z.infer<typeof addMoneySchema>;

export function UserAddMoneyModal() {
  const [addMoney] = useAddMoneyMutation();

  const [open, setOpen] = useState(false);

  const form = useForm<AddMoneySchema>({
    resolver: zodResolver(addMoneySchema) as Resolver<AddMoneySchema>,
    defaultValues: {
      amount: 500,
    },
  });

  const onSubmit = async (data: AddMoneySchema) => {
    const amountData = {
      amount: data.amount,
    };
    try {
      const res = await addMoney(amountData).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Division added successfully");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      if (err && typeof err === "object" && "status" in err) {
        const error = err as { status: number };
        if (error.status === 400) {
          toast.error("You can not add negative amount");
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="hover:cursor-pointer">
            Add Money
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Money</DialogTitle>
            <DialogDescription>
              Enter amount which you want to add to your wallet
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form id="add-money" onSubmit={form.handleSubmit(onSubmit)}>
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
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="add-money">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
