import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInValidation } from "../utils/validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Spinner } from "@nextui-org/spinner";

const SignInForm = () => {
  const navigate = useNavigate();
  const { user, isGettingUser } = useGetCurrentUser();
  const { loginUser, isLoggingIn } = useLogin();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const form = useForm({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    if (!values) return;

    const { email, password } = values;

    loginUser({ email, password });
  }

  if (isGettingUser)
    return (
      <Spinner
        label="Loading..."
        size="lg"
        color="secondary"
        labelColor="secondary"
      />
    );

  return (
    <div className="flex w-full flex-col items-center px-12 lg:mx-auto lg:w-1/2">
      <div className="flex flex-1 flex-col items-center justify-between">
        <img
          src="../../../../public/assets/images/logo.svg"
          alt="logo"
          width={300}
          height={300}
        />
        <h2 className="mt-12 text-center text-2xl font-bold tracking-wider sm:text-4xl xl:text-3xl 2xl:text-4xl">
          Log in to your account
        </h2>
        <h3 className="mb-8 mt-2 text-center font-semibold text-gray-500">
          Welcome back! Please enter your credentials
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>
                <FormControl>
                  <Input className="border-gray-600 bg-gray-900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="border-gray-600 bg-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="primary" className="mt-6 text-lg">
            {isLoggingIn ? <Spinner size="sm" color="secondary" /> : "Sign in "}
          </Button>
        </form>
      </Form>
      <span className="mt-4 text-lg">
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" className="text-purple-600">
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default SignInForm;
