import { usePostStats } from "../hooks/usePostStats";
import { memo, useMemo } from "react";
import { FaHeart, FaRegBookmark, FaRegHeart, FaBookmark } from "react-icons/fa";

const PostCardActions = ({ post, className }) => {
  const {
    isLiked,
    handleLikes,
    isLiking,
    likesArray,
    isSavingPost,
    isSavedPost,
    handleSavedPosts,
  } = usePostStats(post);

  const HEART_ICON_CLASS = "cursor-pointer text-xl transition-all duration-300";

  const HeartIcon = isLiked ? FaHeart : FaRegHeart;
  const heartIconProps = useMemo(
    () => ({
      className: `${HEART_ICON_CLASS} ${isLiked ? "text-red-500" : "text-purple-600 hover:text-red-600 hover:shadow-red-500"}`,
    }),
    [isLiked],
  );

  const BOOKMARK_ICON_CLASS =
    "cursor-pointer text-xl font-semibold text-purple-600 transition-all duration-300 hover:text-purple-500";

  return (
    <div className={`flex w-full justify-between px-4 pb-2 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <button onClick={handleLikes} disabled={isLiking}>
          <HeartIcon {...heartIconProps} />
        </button>

        <p className="text-medium font-semibold">{likesArray?.length}</p>
      </div>
      <button onClick={handleSavedPosts} disabled={isSavingPost}>
        {!isSavedPost ? (
          <FaRegBookmark className={BOOKMARK_ICON_CLASS} />
        ) : (
          <FaBookmark className={BOOKMARK_ICON_CLASS} />
        )}
      </button>
    </div>
  );
};

PostCardActions.displayName = "PostCardActions";

export default PostCardActions;

/*
const PostCardActions = memo(
  ({
    isLiked,
    onHandleLikes,
    likesArray,
    isLiking,
    onHandleSavePost,
    isSavingPost,
    isSavedPost,
  }) => {
    const HEART_ICON_CLASS =
      "cursor-pointer text-xl transition-all duration-300";

    const HeartIcon = isLiked ? FaHeart : FaRegHeart;
    const heartIconProps = useMemo(
      () => ({
        className: `${HEART_ICON_CLASS} ${isLiked ? "text-red-500" : "text-purple-600 hover:text-red-600 hover:shadow-red-500"}`,
      }),
      [isLiked],
    );

    const BOOKMARK_ICON_CLASS =
      "cursor-pointer text-xl font-semibold text-purple-600 transition-all duration-300 hover:text-purple-500";

    return (
      <div className="flex justify-between px-4 pb-2">
        <div className="flex items-center justify-center gap-2">
          <button onClick={onHandleLikes} disabled={isLiking}>
            <HeartIcon {...heartIconProps} />
          </button>

          <p className="text-medium font-semibold">{likesArray.length}</p>
        </div>
        <button onClick={onHandleSavePost} disabled={isSavingPost}>
          {!isSavedPost ? (
            <FaRegBookmark className={BOOKMARK_ICON_CLASS} />
          ) : (
            <FaBookmark className={BOOKMARK_ICON_CLASS} />
          )}
        </button>
      </div>
    );
  },
);
*/
