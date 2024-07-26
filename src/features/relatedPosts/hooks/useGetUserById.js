import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS_RELATED_POSTS } from "../utils/queryRelatedPosts";
import { getUserById } from "../utils/apiRelatedPosts";
import { useEffect } from "react";

export const useGetUserById = (userId) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (userId) {
      // Invalidar la query anterior y forzar una nueva con el nuevo userId
      queryClient.invalidateQueries([
        QUERY_KEYS_RELATED_POSTS.GET_POSTS_BY_USER,
      ]);
    }
  }, [userId, queryClient]);

  const { data: userById, isPending: isGettingUser } = useQuery({
    queryKey: [QUERY_KEYS_RELATED_POSTS.GET_POSTS_BY_USER, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
  return {
    userById,
    isGettingUser,
  };
};
