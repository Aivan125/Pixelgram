import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpValidation } from "../utils/validation";
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
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser } from "../hooks/useCreateUser";
import SpinnerFullPage from "@/components/ui/SpinnerFullPage";

const SignUpForm = () => {
  const { createUser, isCreatingUser } = useCreateUser();

  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (!values) return;

    const { email, password, name, username } = values;

    createUser(
      { email, password, name, username },
      {
        onSuccess: () => {
          navigate("/verify-email-pending");
        },
      },
    );
  }

  if (isCreatingUser) return <SpinnerFullPage />;

  return (
    <div className="flex w-full flex-col items-center px-8 lg:mx-auto lg:w-1/2">
      <div className="flex flex-1 flex-col items-center justify-between">
        <img
          src="/assets/images/Pixelgram.png"
          alt="logo"
          width={150}
          height={150}
          className="mt-2"
        />
        <h2 className="mt-2 text-center text-2xl font-bold tracking-wider sm:text-3xl">
          Create a new account
        </h2>
        <h3 className="mb-4 whitespace-nowrap text-center font-semibold text-gray-500">
          To use Snapgram please enter your account credentials
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Name</FormLabel>
                <FormControl>
                  <Input className="border-gray-600 bg-gray-900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Username</FormLabel>
                <FormControl>
                  <Input className="border-gray-600 bg-gray-900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className="border-gray-600 bg-gray-900"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-600 bg-gray-900"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="primary" className="mt-6 text-lg">
            Create account
          </Button>
        </form>
      </Form>
      <span className="mt-4 text-lg">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-purple-600">
          Sign in
        </Link>
      </span>
    </div>
  );
};

export default SignUpForm;
