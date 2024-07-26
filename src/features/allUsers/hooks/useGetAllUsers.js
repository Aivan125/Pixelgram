import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS_USERS } from "../utils/queryKeysUsers";
import { getAllUsers } from "../utils/apiUsers";

export const useGetAllUsers = () => {
  const { data: getUsers, isPending: isGettingUsers } = useQuery({
    queryKey: [QUERY_KEYS_USERS.GET_ALL_USERS],
    queryFn: getAllUsers,
  });

  return {
    getUsers,
    isGettingUsers,
  };
};
