import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFollowers } from "../utils/apiUsers";
import { QUERY_KEYS_USERS } from "../utils/queryKeysUsers";
import { QUERY_KEYS_AUTH } from "@/features/auth/utils/queryKeys";

export const useFollowers = () => {
  const queryClient = useQueryClient();
  const { mutate: updateFollowUser, isPending: isFollowing } = useMutation({
    mutationFn: ({
      friendshipCurrUserId,
      followingArrayCurrentUser,
      followerFriendshipId,
      followersArray,
    }) =>
      updateFollowers({
        friendshipCurrUserId,
        followingArrayCurrentUser,
        followerFriendshipId,
        followersArray,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS_USERS.GET_ALL_USERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS_AUTH.GET_CURRENT_USER],
      });
    },
  });

  return {
    updateFollowUser,
    isFollowing,
  };
};
