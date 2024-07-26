import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS_PROFILE } from "../utils/queryKeysProfile";
import { getListOfUsers } from "../utils/apiProfile";

export const useGetListOfUsers = (followers) => {
  const { data: listFollowers, isPending: isGettingFollowers } = useQuery({
    queryKey: [QUERY_KEYS_PROFILE.GET_FOLLOWERS, followers],
    queryFn: () => getListOfUsers(followers),
  });
  return {
    listFollowers,
    isGettingFollowers,
  };
};
