import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { useSavePost } from "@/features/posts/hooks/useSavePost";
import { useUpdateLikes } from "@/features/posts/hooks/useUpdateLikes";
import { useCallback, useMemo, useState } from "react";

export const usePostStats = (post) => {
  const { $id: postId, likes, saves } = post || {};
  const { updateLikes, isLiking } = useUpdateLikes();
  const { savePost, isSavingPost } = useSavePost();
  const { user } = useGetCurrentUser();
  const { $id: userId } = user || {};
  const { $id: saveId } = saves || {};

  // Guardar solo los id de los users que le dieron like y guardarlos en el estado inicial
  const initialLikesArray = useMemo(
    () => likes?.map((like) => like.$id),
    [likes],
  );
  const [likesArray, setLikesArray] = useState(initialLikesArray);

  // verificar si el current user ya le dio like al post
  const isLikedIncluded = useMemo(
    () => likesArray?.some((like) => like === userId),
    [likesArray, userId],
  );

  // guardar el estado de si el post ya tiene like o no, hacemos esto para que cada componente tenga su propio like.
  const [isLiked, setIsLiked] = useState(isLikedIncluded);

  // handleLikes: aqui va toda la logica cuando le damos click al boton de like
  const handleLikes = useCallback(
    (e) => {
      e.stopPropagation();
      let newLikesArray = [...likesArray];

      if (isLikedIncluded) {
        newLikesArray = newLikesArray.filter((like) => like !== userId);
      } else {
        newLikesArray = [...newLikesArray, userId];
      }

      updateLikes({ newLikesArray, postId });
      setLikesArray(newLikesArray);
      setIsLiked((like) => !like);
    },
    [isLikedIncluded, likesArray, postId, updateLikes, userId],
  );

  // Guardar el post

  // obtener solo el id del user que le dio save.
  const initialSavesArray = saves?.savedBy?.map((saveUser) => saveUser?.$id);
  const [savesArray, setSaves] = useState(initialSavesArray);

  // 1.- verify if the post is saved by the user.
  const isSaved = useMemo(
    () => savesArray?.some((savedPostId) => savedPostId === userId),
    [userId, savesArray],
  );

  // guardar isSaved dentro de un estado, esto podría evitarse pero mejor lo dejamos así por el momento.
  const [isSavedPost, setIsSavedPost] = useState(isSaved);

  // handleSavedPosts = aqui va la lógica cuando le doy click al botón de bookmark
  const handleSavedPosts = useCallback(() => {
    let savedPostArray = [...savesArray];
    if (!isSaved) {
      savedPostArray = [...savedPostArray, userId];
    } else {
      savedPostArray = savedPostArray.filter(
        (savedPostId) => savedPostId !== userId,
      );
    }

    setSaves(savedPostArray);
    savePost({ savedPostArray, saveId });
    setIsSavedPost((save) => !save);
  }, [userId, isSaved, savesArray, savePost, saveId]);

  return {
    isLiked,
    handleLikes,
    isLiking,
    likesArray,
    isSavingPost,
    isSavedPost,
    handleSavedPosts,
  };
};
