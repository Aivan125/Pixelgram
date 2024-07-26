import { useState } from "react";
import { useFollowers } from "../hooks/useFollowers";
import LazyImage from "@/components/ui/LazyImage";
import { Link } from "react-router-dom";

const TopCreators = ({ user, currentUser }) => {
  const { updateFollowUser, isFollowing } = useFollowers();
  const [isHovering, setIsHovering] = useState(false);
  const {
    avatarUrl,
    name,
    username,
    friendship: { $id: followerFriendshipId, followers },
    $id: userId,
  } = user || {};

  const {
    friendship: { $id: friendshipCurrUserId, following: followingCurrentUser },
    $id: currentUserId,
  } = currentUser;

  // 1.- check if I already followed the user.
  const hasFollow = followers.includes(currentUserId);

  const [isFollowingUser, setIsFollowing] = useState(hasFollow);

  const handleFollow = () => {
    let followingArrayCurrentUser = [];
    let followersArray = [];

    // 2.- if there is NO follow, make an array with the followers

    if (!hasFollow) {
      // 2.1 -update following attribute current user
      followingArrayCurrentUser = [...followingCurrentUser, userId];

      // 2.2 - update user (new follower) in friendship collection
      // necesito el id del friendship collection y actualizar el follower attribute haciendo un nuevo array y agregando el id del currentUser

      followersArray = [...followers, currentUserId];
    } else {
      const filteredArrayFollowing = followingCurrentUser.filter(
        (followingId) => followingId !== userId,
      );

      followingArrayCurrentUser = [...filteredArrayFollowing];

      const filteredArrayFollowers = followers.filter(
        (followerId) => followerId !== currentUserId,
      );

      followersArray = [...filteredArrayFollowers];
    }

    updateFollowUser({
      followingArrayCurrentUser,
      friendshipCurrUserId,
      followersArray,
      followerFriendshipId,
    });
    setIsFollowing((follow) => !follow);
  };

  return (
    <div className="flex w-[180px] flex-col items-center justify-center rounded-lg border-1 border-gray-800 p-4">
      <Link to={`/profile/${userId}`}>
        <div className="mb-2 h-16 w-16 overflow-hidden rounded-full">
          <LazyImage
            src={avatarUrl}
            alt="Photo"
            className="h-full overflow-hidden rounded-lg object-cover"
            skeletonClassName="bg-gray-700"
            rootMargin="9999px 0px"
            threshold={0}
            errorMessage="Error loading image"
          />
        </div>
      </Link>
      <h2 className="mb-1 text-medium font-semibold text-gray-300">{name}</h2>
      <h2 className="text-sm font-bold text-gray-500">{username}</h2>
      <button
        className={`mt-4 rounded-full px-6 py-2 text-white transition-all transition-colors duration-300 ${isFollowingUser ? "bg-gray-900 hover:bg-red-800/60" : "bg-purple-500 hover:bg-purple-600"}`}
        onClick={handleFollow}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isFollowingUser ? (isHovering ? "Unfollow" : "Following") : "Follow"}
      </button>
    </div>
  );
};

export default TopCreators;
