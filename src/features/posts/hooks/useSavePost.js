import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSavePost } from "../utils/apiPosts";
import { QUERY_KEYS_POSTS } from "../utils/queryKeysPosts";
import { QUERY_KEYS_AUTH } from "@/features/auth/utils/queryKeys";

export const useSavePost = () => {
  const queryClient = useQueryClient();

  const { mutate: savePost, isPending: isSavingPost } = useMutation({
    mutationFn: ({ savedPostArray, saveId }) =>
      updateSavePost({ savedPostArray, saveId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS_POSTS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS_POSTS.GET_POST_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS_AUTH.GET_CURRENT_USER],
      });
    },
  });
  return {
    savePost,
    isSavingPost,
  };
};
