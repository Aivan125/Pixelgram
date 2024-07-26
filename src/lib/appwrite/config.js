import { Account, Avatars, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_SAVES_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_POSTS_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID,
  avatarsStorageId: import.meta.env.VITE_APPWRITE_STORAGE_AVATARS_ID,
  friendshipCollectionId: import.meta.env
    .VITE_APPWRITE_COLLECTION_FRIENDSHIP_ID,
  emailVerificationURL: import.meta.env.VITE_APPWRITE_URL_REDIRECT,
};

const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
