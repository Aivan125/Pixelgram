import { appwriteConfig, databases, storage } from "@/lib/appwrite/config";
import { ID, ImageGravity, Query } from "appwrite";

export const updateProfileInfo = async ({
  data,
  avatarId: avatarIdStorage,
  userId,
}) => {
  const { name, bio, avatar } = data;
  let newAvatarUrl = avatar;
  let newAvatarId = avatarIdStorage;

  const hasNewImage = avatar instanceof File && avatar.size > 0;

  try {
    if (hasNewImage) {
      const uploadFile = await storage.createFile(
        appwriteConfig.avatarsStorageId,
        ID.unique(),
        avatar,
      );

      if (!uploadFile) {
        deleteImageAvatarStorage(avatarIdStorage);
        throw new Error("Failed by uploading the image");
      }

      newAvatarId = uploadFile.$id;
      newAvatarUrl = storage.getFilePreview(
        appwriteConfig.avatarsStorageId,
        uploadFile.$id,
        400,
        400,
        ImageGravity.Center,
      );

      if (!newAvatarUrl) {
        deleteImageAvatarStorage(uploadFile.$id);
        throw new Error("Failed getting the avatar url.");
      }
    } else {
      newAvatarUrl = avatar;
      newAvatarId = avatarIdStorage;
    }

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
      {
        name,
        bio,
        avatarUrl: newAvatarUrl,
        avatarId: newAvatarId,
      },
    );

    if (updatedUser && hasNewImage)
      await deleteImageAvatarStorage(avatarIdStorage);

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const deleteImageAvatarStorage = async (imageId) => {
  try {
    const deletedFile = await storage.deleteFile(
      appwriteConfig.avatarsStorageId,
      imageId,
    );

    if (!deletedFile) throw new Error("Image could not be deleted.");
    return { status: "ok" };
  } catch (error) {
    throw Error;
  }
};

export const getListOfUsers = async (followers) => {
  try {
    const listOfUsers = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("$id", followers)],
    );

    return listOfUsers.documents;
  } catch (error) {
    console.log(error.message);
    throw Error;
  }
};
