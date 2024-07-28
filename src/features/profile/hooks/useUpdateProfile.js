import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS_AUTH } from "@/features/auth/utils/queryKeys";
import { updateProfileInfo } from "../utils/apiProfile";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: ({ data, avatarId, userId }) =>
      updateProfileInfo({ data, avatarId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS_AUTH.GET_CURRENT_USER],
      });
      toast({
        description: "Profile was successfully updated !",
        variant: "successful",
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        description: `The Profile could not be updated. Please try again! ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    updateProfile,
    isUpdatingProfile,
  };
};
