import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostDB } from "../utils/apiPosts";
import { QUERY_KEYS_POSTS } from "../utils/queryKeysPosts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const useDeletePost = () => {
  const { GET_POSTS } = QUERY_KEYS_POSTS;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: ({ postId, savedPostId }) =>
      deletePostDB({ postId, savedPostId }),
    onSuccess: () => {
      toast({
        description: "Post was successfully deleted !",
        variant: "successful",
      });
      queryClient.invalidateQueries({
        queryKey: [GET_POSTS],
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        description: `The post could not be updated. Please try again! ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    deletePost,
    isDeleting,
  };
};
