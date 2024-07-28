// hacer el api para obtener los posts creados del dia de hoy

import { appwriteConfig, databases } from "@/lib/appwrite/config";
import { getEndOfToday, getStartOfToday } from "@/lib/utils";
import { Query } from "appwrite";

export const getPostsCreatedToday = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [
        Query.greaterThanEqual("$createdAt", getStartOfToday()),
        Query.lessThan("$createdAt", getEndOfToday()),
      ],
    );

    if (!posts) throw new Error("Failed to get posts created today");

    return posts.documents;
  } catch (error) {
    throw error.message;
  }
};

const getStartOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 es domingo, 1 es lunes, etc.
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Ajuste cuando es domingo
  const startOfWeek = new Date(now.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};

const getEndOfWeek = () => {
  const endOfWeek = new Date(getStartOfWeek());
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  endOfWeek.setHours(0, 0, 0, 0);
  return endOfWeek;
};

export const getPostsCreatedWeekly = async () => {
  try {
    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek();

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [
        Query.greaterThanEqual("$createdAt", startOfWeek.toISOString()),
        Query.lessThan("$createdAt", endOfWeek.toISOString()),
      ],
    );

    if (!posts) throw new Error("Failed to get posts created this week");

    return posts.documents;
  } catch (error) {
    throw error.message;
  }
};
