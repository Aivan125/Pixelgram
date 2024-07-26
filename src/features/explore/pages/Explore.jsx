import ContainerSection from "@/components/ui/ContainerSection";
import { Button } from "@/components/ui/button";
import PostGrid from "../components/PostGrid";
import { useGetPostsToday } from "../hooks/useGetPostsToday";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";
import { useGetWeeklyPosts } from "../hooks/useGetWeeklyPosts";
import SpinnerFullPage from "@/components/ui/SpinnerFullPage";
import SpinnerComponent from "@/components/ui/SpinnerComponent";

const Explore = () => {
  const [todayPosts, setTodayPosts] = useState(true);
  const [weekPosts, setWeekPosts] = useState(false);
  const { postsToday, isGettingTodayPosts } = useGetPostsToday();
  const { weeklyPosts, isGettingWeeklyPosts } = useGetWeeklyPosts();

  const handleTodayPosts = () => {
    setTodayPosts(true);
    setWeekPosts(false);
  };

  const handleWeeklyPosts = () => {
    setTodayPosts(false);
    setWeekPosts(true);
  };

  const activeClass = "bg-gray-500/80 hover:bg-gray-400/80";

  if (isGettingTodayPosts || isGettingWeeklyPosts) return <SpinnerComponent />;
  return (
    <ContainerSection>
      <div className="my-24 px-8 md:my-0 md:py-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl tracking-widest">Popular posts </h2>
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={handleTodayPosts}
              className={`text-xs uppercase ${todayPosts && activeClass}`}
            >
              Today
            </Button>
            <Button
              onClick={handleWeeklyPosts}
              className={`text-xs uppercase ${weekPosts && activeClass}`}
            >
              This week
            </Button>
          </div>
        </div>
        <hr className="my-8 border-1 border-gray-900" />
        {todayPosts && postsToday.length > 0 && <PostGrid posts={postsToday} />}
        {todayPosts && postsToday.length === 0 && (
          <p className="text-center text-gray-400">
            No posts created today yet
          </p>
        )}
        {weekPosts && weeklyPosts.length > 0 && (
          <PostGrid posts={weeklyPosts} />
        )}
        {weekPosts && weeklyPosts.length === 0 && (
          <p className="text-center text-gray-400">
            No posts created this week
          </p>
        )}
      </div>
    </ContainerSection>
  );
};

export default Explore;
