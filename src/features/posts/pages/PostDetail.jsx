import ContainerSection from "@/components/ui/ContainerSection";
import ProfileCard from "@/components/ui/ProfileCard";
import { useMemo, useState } from "react";
import { useGetPostById } from "../hooks/useGetPostById";
import { useNavigate, useParams } from "react-router-dom";
import DropdownMenuSection from "@/components/ui/DropdownMenuSection";
import PostCardActions from "../components/PostCardActions";
import { TiArrowBackOutline } from "react-icons/ti";
import LazyImage from "@/components/ui/LazyImage";
import SpinnerComponent from "@/components/ui/SpinnerComponent";
import { useGetUserById } from "@/features/relatedPosts/hooks/useGetUserById";
import PostGrid from "@/features/explore/components/PostGrid";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  // Dropdwon Menu State
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // getting post
  const { post, isGettingPost } = useGetPostById(postId) || {};
  const { creator, $createdAt: createdAt, imageUrl, caption } = post || {};

  // getting user by id
  const { userById, isGettingUser } = useGetUserById(creator?.$id) || {};

  //get current user
  const { user, isGettingUser: isGettingCurrentUser } = useGetCurrentUser();

  const profileCardProps = useMemo(
    () => ({
      creator,
      createdAt,
    }),
    [createdAt, creator],
  );

  if (isGettingUser || isGettingPost) return <SpinnerComponent />;

  return (
    <ContainerSection className="pb-24">
      <button
        className="absolute left-16 top-20 flex items-center justify-center gap-4 text-purple-700 md:top-10 2xl:left-36"
        onClick={handleBack}
      >
        <TiArrowBackOutline className="text-3xl" />
        <strong className="text-xl">Back</strong>
      </button>
      <div className="mx-auto w-[90%]">
        <article
          aria-labelledby="post-title"
          className="relative mx-auto mt-[140px] grid w-full grid-cols-1 rounded-lg border-[1px] border-gray-800 bg-gray-900/50 px-4 pb-4 xl:grid-cols-2 xl:grid-rows-3"
        >
          <div className="w-full gap-2 border-b-[1px] border-gray-900 px-2 py-4">
            <ProfileCard {...profileCardProps} />
          </div>

          <figure className="my-4 w-full xl:col-start-1 xl:row-span-full xl:my-0 xl:py-2">
            <LazyImage
              src={imageUrl}
              alt="Photo"
              className="h-full overflow-hidden rounded-lg object-cover"
              skeletonClassName="bg-gray-700"
              rootMargin="400px 0px"
              threshold={0}
              errorMessage="Error loading image"
            />
          </figure>
          <div className="xl: mb-4 border-b-[1px] border-gray-900 pb-4 xl:row-start-3 xl:m-0 xl:flex xl:h-full xl:items-end xl:self-end xl:border-0">
            <PostCardActions post={post} />
          </div>
          <figcaption className="xl:row-start-2 xl:pl-4 xl:pt-4">
            {caption}
          </figcaption>
          {creator.$id === user.$id && (
            <div className="absolute right-0 top-7 mr-3">
              <DropdownMenuSection
                isDialogOpen={isDialogOpen}
                onOpenDialog={setIsDialogOpen}
                postId={postId}
                postDetailsSection={false}
              />
            </div>
          )}
        </article>
        <hr className="my-10 border-gray-800" />
        <section className="mx-auto">
          <h2 className="mb-8 text-3xl font-bold">More related posts</h2>
          <PostGrid posts={userById.posts} />
        </section>
      </div>
    </ContainerSection>
  );
};

export default PostDetail;
