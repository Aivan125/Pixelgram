import { useMutation } from "@tanstack/react-query";
import { createUserAccountWithVerification } from "../utils/apiAuth";
import { useToast } from "@/components/ui/use-toast";

export const useCreateUser = () => {
  const { toast } = useToast();

  const { mutate: createUser, isPending: isCreatingUser } = useMutation({
    mutationFn: ({ email, password, name, username }) =>
      createUserAccountWithVerification({ email, password, name, username }),
    onSuccess: () => {
      toast({
        description: "You have successfully created an account!",
        variant: "successful",
      });
    },
    onError: (error) => {
      toast({
        description: `There was an error logging in: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    createUser,
    isCreatingUser,
  };
};
