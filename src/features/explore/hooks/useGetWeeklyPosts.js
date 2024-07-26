import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS_EXPLORE } from "../utils/queryKeysExplore";
import { getPostsCreatedWeekly } from "../utils/apiExplore";

export const useGetWeeklyPosts = () => {
  const { data: weeklyPosts, isPending: isGettingWeeklyPosts } = useQuery({
    queryKey: [QUERY_KEYS_EXPLORE.GET_WEEKLY_POSTS],
    queryFn: getPostsCreatedWeekly,
  });

  return { weeklyPosts, isGettingWeeklyPosts };
};
