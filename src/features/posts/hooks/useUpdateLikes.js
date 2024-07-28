import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateLikesPostDB } from "../utils/apiPosts";
import { QUERY_KEYS_POSTS } from "../utils/queryKeysPosts";
import { QUERY_KEYS_AUTH } from "@/features/auth/utils/queryKeys";

export const useUpdateLikes = () => {
  const queryClient = useQueryClient();

  const { mutate: updateLikes, isPending: isLiking } = useMutation({
    mutationFn: ({ newLikesArray, postId }) =>
      updateLikesPostDB({ newLikesArray, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS_POSTS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS_AUTH.GET_CURRENT_USER],
      });
    },
  });

  return {
    updateLikes,
    isLiking,
  };
};
