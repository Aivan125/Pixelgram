import { useMutation } from "@tanstack/react-query";
import { updateVerificationEmail } from "../utils/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export const useUpdateVerificationEmail = () => {
  const {
    mutate: updateVerificationEmailUser,
    isPending: isVerifyingEmail,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ userId, secret }) =>
      updateVerificationEmail({ userId, secret }),
    onSuccess: () => {
      toast({
        description: "Email verified successfully!",
        variant: "successful",
      });
    },
    onError: (error) => {
      toast({
        description: `There was an error verifying the email, ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    updateVerificationEmailUser,
    isVerifyingEmail,
    isSuccess,
    error,
    isError,
  };
};
