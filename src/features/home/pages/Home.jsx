import { IoHomeOutline } from "react-icons/io5";
import PostCard from "../components/PostCard";
import MainContainerSection from "@/components/ui/MainContainerSection";
import { useGetPosts } from "@/features/posts/hooks/useGetPosts";
import SpinnerComponent from "@/components/ui/SpinnerComponent";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect } from "react";

const Home = () => {
  const {
    posts,
    isGettingPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPosts();

  const { ref, inView } = useInView();

  const handleLoadMore = useCallback(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  if (isGettingPosts && !posts.length) return <SpinnerComponent />;
  return (
    <MainContainerSection iconSection={IoHomeOutline} titleSection={"Home"}>
      <div className="mt-4 flex flex-col items-center justify-center space-y-4 p-4">
        {posts?.map((post, index) => (
          <PostCard key={post.$id} post={post} index={index} />
        ))}

        {/* Elemento observador para infinite scroll */}
        <div ref={ref} className="h-10 w-full">
          {isFetchingNextPage ? (
            <SpinnerComponent />
          ) : hasNextPage ? (
            <p className="text-center">Scroll for more</p>
          ) : (
            <p className="text-center">No more posts</p>
          )}
        </div>
      </div>
    </MainContainerSection>
  );
};

export default Home;
