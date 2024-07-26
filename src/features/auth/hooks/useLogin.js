import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { QUERY_KEYS_AUTH } from "../utils/queryKeys";
import { loginWithVerification } from "../utils/apiAuth";
import { useToast } from "@/components/ui/use-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: loginUser, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) =>
      loginWithVerification({ email, password }),
    onSuccess: (data) => {
      toast({
        description: "You have successfully logged in!",
        variant: "successful",
      });
      queryClient.setQueryData([QUERY_KEYS_AUTH.GET_CURRENT_USER, data.userId]);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: `Login failed: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  return {
    loginUser,
    isLoggingIn,
  };
};
