import { appwriteConfig, databases, storage } from "@/lib/appwrite/config";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { ID, ImageGravity, Query } from "appwrite";

export const createPostDB = async (post) => {
  const { caption, file, location, tags, userId } = post;

  const tagsArray = tags.replace(/\s+/g, "").trim().toLowerCase().split(",");
  try {
    // 1.- upload image to storage
    const imageStorage = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file[0],
    );

    // 2.- get the Url of the image stored in Storage
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      imageStorage.$id,
      2000,
      2000,
      ImageGravity.Center,
    );

    // 3.- save the post in Post Collections
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: userId,
        caption,
        imageUrl: fileUrl,
        location,
        imageId: imageStorage.$id,
        tags: tagsArray,
      },
    );

    if (!newPost) {
      deleteImageStorage(imageStorage.$id);
      throw new Error("There was a problem by creating a new Post");
    }

    // Create the save post document

    if (newPost) {
      const createSavePost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        ID.unique(),
        {
          post: newPost.$id,
        },
      );

      if (!createSavePost) {
        deleteImageStorage(imageStorage.$id);
        throw new Error("Save Post could not be created");
      }
    }

    return newPost;
  } catch (error) {
    console.log(error.message);
    throw Error;
  }
};

export const deleteImageStorage = async (imageId) => {
  try {
    const deletedFile = await storage.deleteFile(
      appwriteConfig.storageId,
      imageId,
    );

    if (!deletedFile) throw new Error("Image could not be deleted.");
    return { status: "ok" };
  } catch (error) {
    throw Error;
  }
};

export const getPosts = async ({ pageParam = 0 }) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(POSTS_PER_PAGE),
        Query.offset(pageParam * POSTS_PER_PAGE),
      ],
    );

    return posts.documents;
  } catch (error) {
    throw Error;
  }
};

export const updateLikesPostDB = async ({ postId, newLikesArray }) => {
  try {
    const likesArray = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: newLikesArray,
      },
    );

    if (!likesArray) throw new Error("Likes could not be updated");

    return likesArray;
  } catch (error) {
    throw Error;
  }
};

export const createSavePost = async ({ savedPostArray, postId }) => {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        savedBy: savedPostArray,
        posts: postId,
      },
    );

    if (!savedPost) throw new Error("Post could not be saved.");

    return savedPost;
  } catch (error) {
    throw Error;
  }
};

export const updateSavePost = async ({ saveId, savedPostArray }) => {
  try {
    const savedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      saveId,
      {
        savedBy: savedPostArray,
      },
    );

    if (!savedPost) throw new Error("Post could not be saved(2)");

    return savedPost;
  } catch (error) {
    throw Error;
  }
};

export const getPost = async (postId) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
    );

    if (!post) throw new Error("There was a problem getting the post");
    return post;
  } catch (error) {
    throw Error;
  }
};

export const editPost = async (post) => {
  try {
    const hasFileToUpload = post?.file?.length > 0;
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpload) {
      // 1.- upload image to storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw new Error("Failed to upload file");

      // 2.- get the Url of the image stored in Storage
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        uploadedFile.$id,
        2000,
        2000,
        ImageGravity.Center,
      );

      // delete file from storage if there is an error
      if (!fileUrl) {
        await deleteImageStorage(uploadedFile.$id);
        throw new Error("Failed to get file Url");
      }

      // create image object
      image = { imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    const tagsArray = post.tags
      .replace(/\s+/g, "")
      .trim()
      .toLowerCase()
      .split(",");

    // update to dabase
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tagsArray,
      },
    );

    // in case there is an error by updating the post info, eliminate the image in storage
    if (!updatedPost) {
      if (hasFileToUpload) {
        await deleteImageStorage(image.imageId);
      }
      throw new Error("Failed to update post");
    }
    // if the updated was successful && there is an image to upload, then delete the old image.
    if (hasFileToUpload) {
      await deleteImageStorage(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error editing post:", error.message);
  }
};

export async function uploadFile(file) {
  try {
    // comunicarte con el storage de Appwrite. A createFile necesitamos pasarle 3 parámetros, el id del storage, el ID que se creará y el archivo a subir.
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
    );

    return uploadedFile;
  } catch (error) {
    console.log(error.message);
  }
}

export const deletePostDB = async (postId) => {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
    );

    return { response };
  } catch (error) {
    throw Error;
  }
};
