import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS_POSTS } from "../utils/queryKeysPosts";
import { getPosts } from "../utils/apiPosts";
import { POSTS_PER_PAGE } from "@/lib/constants";

export const useGetPosts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS_POSTS.GET_POSTS],
    queryFn: getPosts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POSTS_PER_PAGE) {
        return undefined; // No hay más páginas
      }
      return allPages.length; // Siguiente número de página
    },
  });

  return {
    posts: data?.pages.flatMap((page) => page) ?? [],
    isGettingPosts: status === "loading",
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: status === "error" ? error : null,
  };
};
