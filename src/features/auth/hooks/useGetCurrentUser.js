import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS_AUTH } from "../utils/queryKeys";
import { getCurrentUser } from "../utils/apiAuth";

export const useGetCurrentUser = () => {
  const { data: user, isPending: isGettingUser } = useQuery({
    queryKey: [QUERY_KEYS_AUTH.GET_CURRENT_USER],
    queryFn: getCurrentUser,
    retry: false,
  });

  return {
    user,
    isGettingUser,
  };
};
