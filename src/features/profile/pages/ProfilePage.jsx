import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import PostAndSavesGrid from "../components/PostAndSavesGrid";
import { useGetUserById } from "@/features/relatedPosts/hooks/useGetUserById";
import SpinnerComponent from "@/components/ui/SpinnerComponent";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";

const ProfilePage = () => {
  const { userId } = useParams();
  const { userById, isGettingUser } = useGetUserById(userId);
  const { friendship: { followers, following } = {} } = userById || {};
  const { user: currentUser, isGettingUser: isGettingCurrentUser } =
    useGetCurrentUser();

  if (isGettingUser || isGettingCurrentUser) return <SpinnerComponent />;

  return (
    <article className="h-screen overflow-y-scroll px-10 pb-20 pt-24">
      <section className="flex items-center space-x-6">
        <div className="flex flex-1 items-center justify-center">
          <img
            src={
              userById.avatarUrl ||
              "../../../public//assets/images/avatar-default.jpeg"
            }
            alt="profile"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            {currentUser.$id === userById.$id && (
              <Link to="/editProfile">
                <Button>Edit Profile</Button>
              </Link>
            )}
            <h3 className="font-bold text-gray-300">{userById.name}</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="">
              <output className="mr-1 font-bold text-gray-400">
                {userById.posts.length}
              </output>
              posts
            </p>
            <p>
              <output className="mr-1 font-bold text-gray-400">
                {userById.saves.length}
              </output>
              saved
            </p>
            <Link to={`/followers/${userId}`}>
              <output className="mr-1 font-bold text-gray-400">
                {followers.length}
              </output>
              followers
            </Link>

            <Link to={`/following/${userId}`}>
              <output className="mr-1 font-bold text-gray-400">
                {following.length}
              </output>
              following
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            {userById.bio === null ? (
              ""
            ) : (
              <p className="text-center">{`${userById?.bio}`}</p>
            )}
          </div>
        </div>
      </section>
      <hr className="mb-4 mt-8 border-1 border-gray-900/80" />
      <PostAndSavesGrid user={userById} />
    </article>
  );
};

export default ProfilePage;
