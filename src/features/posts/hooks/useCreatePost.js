import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostDB } from "../utils/apiPosts";
import { useToast } from "@/components/ui/use-toast";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: (post) => createPostDB(post),
    onSuccess: () => {
      toast({
        description: "Your post was successfully created.",
        variant: "successful",
      });
      queryClient.invalidateQueries({
        queryKey: ["recentPost"],
      });
    },
    onError: (err) =>
      toast({
        description: "Post could not be created. Please, try again.",
        variant: "destructive",
      }),
  });
  return {
    createPost,
    isCreatingPost,
  };
};
