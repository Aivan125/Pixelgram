import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { logout } from "../utils/apiAuth";
import { useToast } from "@/components/ui/use-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: logoutSession, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast({
        description: "You have logged out. Come back soon!",
        variant: "successful",
      });
      queryClient.removeQueries();
      navigate("/sign-in", { replace: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    logoutSession,
    isLoggingOut,
  };
};
