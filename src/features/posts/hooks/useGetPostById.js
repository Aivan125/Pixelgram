import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS_POSTS } from "../utils/queryKeysPosts";
import { useParams } from "react-router-dom";
import { getPost } from "../utils/apiPosts";

const { GET_POSTS, GET_POST_BY_ID } = QUERY_KEYS_POSTS;

export const useGetPostById = (postId) => {
  const { data: post, isPending: isGettingPost } = useQuery({
    queryKey: [GET_POSTS, GET_POST_BY_ID, postId],
    queryFn: () => getPost(postId),
  });
  return {
    post,
    isGettingPost,
  };
};
