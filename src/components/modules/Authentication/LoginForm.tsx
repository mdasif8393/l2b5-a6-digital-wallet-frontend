/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import Password from "@/components/Password";
import { useLoginMutation } from "@/redux/features/auth/auth.api";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {
    error: "Password is too short",
  }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "12345678",
    },
  });
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(userInfo).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
        // navigate(`/${(res?.data?.user?.role).toLowerCase()}`);
      }
    } catch (err: any) {
      // if (err.status === 401) {
      //   toast.error("Your account is not verified");
      //   // navigate user to /verify page with user email
      //   navigate("/verify", { state: data.email });
      // }
      if (err?.data?.message === "Incorrect Password") {
        toast.error("Invalid Credentials");
      }
      // if (err?.data?.message === "User is not verified") {
      //   toast.error("Your account is not verified");
      //   navigate("/verify", { state: data.email });
      // }
      console.log(err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email & password below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={(
                { field } // onChange onBlur inside field
              ) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@company.com"
                      {...field}
                    />
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
              name="password"
              render={(
                { field } // onChange onBlur inside field
              ) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}
