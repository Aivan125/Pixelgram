import LazyImage from "@/components/ui/LazyImage";
import PostCardActions from "@/features/posts/components/PostCardActions";
import { useGetPostById } from "@/features/posts/hooks/useGetPostById";
import { Spinner } from "@nextui-org/spinner";
import { Link } from "react-router-dom";

const ImageCard = ({ post, index }) => {
  const { imageUrl } = post;

  return (
    <div className="group relative flex h-full w-full max-w-96 items-center justify-center overflow-hidden rounded-lg shadow-lg sm:max-w-60">
      <Link to={`/post/${post.$id}`}>
        <div className="absolute inset-0 z-10 bg-black opacity-30"></div>
        <LazyImage
          src={imageUrl}
          alt="Photo"
          className="h-full cursor-pointer object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          width="100%"
          height="auto"
          isFirstImage={index < 9}
          skeletonClassName="bg-gray-700"
          rootMargin="400px 0px"
          threshold={0}
          errorMessage="Error loading image"
        />
      </Link>
      <PostCardActions className="absolute bottom-0 right-0 z-20" post={post} />
    </div>
  );
};

export default ImageCard;
