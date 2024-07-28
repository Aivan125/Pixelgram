import DropdownMenuSection from "@/components/ui/DropdownMenuSection";
import LazyImage from "@/components/ui/LazyImage";
import ProfileCard from "@/components/ui/ProfileCard";
import PostCardActions from "@/features/posts/components/PostCardActions";
import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PostCard = memo(({ post, index }) => {
  const {
    caption,
    creator,
    imageUrl,
    location,
    $createdAt,
    $id: postId,
    saves: { $id: savedPostId },
  } = post;

  // Dropdwon Menu State
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Props for the children components
  const profileCardProps = useMemo(
    () => ({
      creator,
      createdAt: $createdAt,
      location,
    }),
    [$createdAt, creator, location],
  );

  return (
    <article className="relative w-full max-w-[600px] space-y-6 rounded-lg border-[1px] border-gray-700 p-2">
      <ProfileCard {...profileCardProps} />
      <Link to={`/post/${postId}`} className="flex flex-col gap-8">
        <div>
          <p className="text-gray-300">{caption}</p>
        </div>
        <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl">
          <LazyImage
            src={imageUrl}
            alt="Photo"
            className="h-full w-full"
            width="100%"
            height="auto"
            isFirstImage={index === 0}
            skeletonClassName="bg-gray-700"
            rootMargin="200px"
            threshold={0.1}
            errorMessage="Error loading image"
          />
        </div>
      </Link>
      <div className="absolute right-3 top-0 mr-1">
        <DropdownMenuSection
          isDialogOpen={isDialogOpen}
          onOpenDialog={setIsDialogOpen}
          postId={postId}
          savedPostId={savedPostId}
        />
      </div>
      <PostCardActions post={post} />
    </article>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;

/*
return (
    <article className="w-full max-w-[600px] space-y-6 rounded-lg border-[1px] border-gray-700 p-2">
      <Link to={`/post/${postId}`} className="relative flex flex-col gap-8">
        <ProfileCard {...profileCardProps} />
        <div>
          <p className="text-gray-300">{caption}</p>
        </div>
        <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl">
          <img src={imageUrl} alt="Photo" className="object-cover" />
        </div>
        <div className="absolute right-0 top-0 mr-1">
          <DropdownMenuSection
            isDialogOpen={isDialogOpen}
            onOpenDialog={setIsDialogOpen}
            postId={postId}
          />
        </div>
      </Link>
      <PostCardActions post={post} />
    </article>
  );
});
*/
