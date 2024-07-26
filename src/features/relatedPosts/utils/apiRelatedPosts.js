import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { Query } from "appwrite";

export const getUserById = async (userId) => {
  if (userId === undefined || "") return;
  try {
    const userById = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
    );

    if (!userById) throw new Error("Failed to get user by id");
    return userById;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};
