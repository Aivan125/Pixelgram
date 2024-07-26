import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS_EXPLORE } from "../utils/queryKeysExplore";
import { getStartOfToday } from "@/lib/utils";
import { getPostsCreatedToday } from "../utils/apiExplore";

export const useGetPostsToday = () => {
  const todayPosts = getStartOfToday();

  const { data: postsToday, isPending: isGettingTodayPosts } = useQuery({
    queryKey: [QUERY_KEYS_EXPLORE.GET_POSTS_TODAY, todayPosts],
    queryFn: getPostsCreatedToday,
  });

  return {
    postsToday,
    isGettingTodayPosts,
  };
};
