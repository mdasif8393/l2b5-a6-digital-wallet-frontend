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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import Password from "@/components/Password";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

// make zod schema
const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name too short",
      })
      .max(50, {
        error: "Name too long",
      }),
    email: z.email(),
    address: z.string(),
    phone: z.string(),
    role: z.enum(["USER", "AGENT"]),
    password: z.string().min(8, {
      error: "Password is too short",
    }),
    confirmPassword: z.string().min(8, {
      error: "Confirm Password is too short",
    }),
  })
  // using refine function check if password and confirm password do not match then show error
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [register] = useRegisterMutation();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    // resolve zod schema and set default values for inputs
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      role: "USER",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      role: data.role,
      password: data.password,
    };

    try {
      const result = await register(userInfo).unwrap();
      if (result) {
        toast.success("User is created successfully. Please Login");
        navigate("/login");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your information to create your account
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
            <FormField
              control={form.control}
              name="address"
              render={(
                { field } // onChange onBlur inside field
              ) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Holding No-1, Bashundhara, Dhaka"
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="AGENT">Agent</SelectItem>
                    </SelectContent>
                  </Select>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={(
                { field } // onChange onBlur inside field
              ) => (
                <FormItem>
                  <FormLabel>Conform Password</FormLabel>
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
              Register
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </div>
  );
}
