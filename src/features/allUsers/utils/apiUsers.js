import { databases, appwriteConfig } from "@/lib/appwrite/config";

export const getAllUsers = async () => {
  try {
    const allUsers = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
    );

    if (!allUsers) throw new Error("Error getting all users");

    return allUsers.documents;
  } catch (error) {
    throw Error;
  }
};

export const updateFollowers = async ({
  friendshipCurrUserId,
  followingArrayCurrentUser,
  followerFriendshipId,
  followersArray,
}) => {
  try {
    // 1.- update the following of the current user
    const followingUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.friendshipCollectionId,
      friendshipCurrUserId,
      {
        following: followingArrayCurrentUser,
      },
    );

    // 2.- update the followers of the user that received the follow
    const followerUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.friendshipCollectionId,
      followerFriendshipId,
      {
        followers: followersArray,
      },
    );

    return {
      followingUser,
      followerUser,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
