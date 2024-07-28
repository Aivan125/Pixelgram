import MainContainerSection from "@/components/ui/MainContainerSection";
import SpinnerComponent from "@/components/ui/SpinnerComponent";
import PostGrid from "@/features/explore/components/PostGrid";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import ImageCard from "@/features/explore/components/ImageCard";
import { Link } from "react-router-dom";
import LazyImage from "@/components/ui/LazyImage";

const SavedPosts = () => {
  const { user, isGettingUser } = useGetCurrentUser();

  if (isGettingUser) return <SpinnerComponent />;

  console.log(user.saves);

  if (user.saves.length === 0)
    return (
      <p className="grid h-screen place-items-center text-gray-400">
        No posts saved yet
      </p>
    );
  return (
    <MainContainerSection
      iconSection={MdOutlineBookmarkAdded}
      titleSection={"Saved Posts"}
    >
      <div className="mt-4 flex flex-col items-center justify-center space-y-4 p-4">
        <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {user?.saves?.map((savedPost, index) => (
            <div
              key={savedPost.$id}
              className="group relative flex h-full w-full max-w-96 items-center justify-center overflow-hidden rounded-lg shadow-lg sm:max-w-60"
            >
              <Link to={`/post/${savedPost.post.$id}`}>
                <div className="absolute inset-0 z-10 bg-black opacity-30"></div>
                <LazyImage
                  src={savedPost.post.imageUrl}
                  alt="Photo"
                  className="h-full cursor-pointer object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  width="100%"
                  height="auto"
                  isFirstImage={index < 9}
                  skeletonClassName="bg-gray-700"
                  rootMargin="400px 0px"
                  threshold={0}
                  errorMessage="Error loading image"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainContainerSection>
  );
};

export default SavedPosts;
