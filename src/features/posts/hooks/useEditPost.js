import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../utils/apiPosts";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS_POSTS } from "../utils/queryKeysPosts";
import { useParams } from "react-router-dom";

export const useEditPost = () => {
  const { GET_POSTS, GET_POST_BY_ID } = QUERY_KEYS_POSTS;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { postId } = useParams();

  const { mutate: updatePost, isPending: istEditing } = useMutation({
    mutationFn: (post) => editPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_POSTS, GET_POST_BY_ID, postId],
      });
      toast({
        description: "Post was successfully edited !",
        variant: "successful",
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        description: `The post could not be updated. Please try again! ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    updatePost,
    istEditing,
  };
};
