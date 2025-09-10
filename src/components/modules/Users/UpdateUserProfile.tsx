import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/Password";
import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import Loading from "@/components/layout/Loading";
import { useEffect } from "react";
import { useUpdateUserInfoMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, {
      error: "Name too short",
    })
    .max(50, {
      error: "Name too long",
    })
    .optional(),
  address: z
    .string()
    .min(3, {
      error: "Address too short",
    })
    .max(100, {
      error: "Address too long",
    })
    .optional(),
  phone: z.string().optional(),
});
export default function UpdateUserProfile() {
  const { data: userData, isLoading: userInfoLoading } =
    useUserInfoQuery(undefined);

  const [updateUserToDatabase] = useUpdateUserInfoMutation();

  console.log(userData?.data);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    // resolve zod schema and set default values for inputs
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userData?.data) {
      form.reset({
        name: userData?.data?.name,
        address: userData?.data?.address,
        phone: userData?.data.phone,
      });
    }
  }, [userData, form]);

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    const updatedUserInfo = {
      userId: userData?.data?._id,
      userInfo: {
        name: data.name,
        address: data.address,
        phone: data.phone,
      },
    };
    try {
      const result = await updateUserToDatabase(updatedUserInfo).unwrap();
      if (result) {
        toast.success("User is updated successfully");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  if (userInfoLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center">
      <div className="gap-6 w-1/4 flex flex-col">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Update your Informations</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your information to update your profile
          </p>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={(
                  { field } // onChange onBlur inside field
                ) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={(
                  { field } // onChange onBlur inside field
                ) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Dhaka" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={(
                  { field } // onChange onBlur inside field
                ) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="01777777777" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
