import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { timeAgo } from "@/lib/utils";
import { memo } from "react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const ProfileCard = memo(({ creator, createdAt, location }) => {
  return (
    <>
      <Link to={`/profile/${creator.$id}`} className="flex gap-4">
        <div className="h-full">
          <LazyImage
            src={
              creator?.avatarUrl ||
              "../../../public//assets/images/avatar-default.jpeg"
            }
            alt={"avatar"}
            width="60px"
            height="60px"
            skeletonClassName="bg-gray-700"
            rootMargin="100px 0px"
            threshold={0}
            errorMessage="Error loading image"
            className="h-full overflow-hidden rounded-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-start gap-2">
            <h3 className="overflow-hidden truncate whitespace-nowrap text-lg text-gray-300">
              {creator?.name.split(" ")[0]}
            </h3>
            <span className="flex items-center justify-center text-2xl text-gray-600">
              •
            </span>
            <span>
              <h3 className="text-md font-semibold text-gray-600">
                @{creator?.username}
              </h3>
            </span>
          </div>
          <div className="flex justify-start gap-2">
            <h3 className="text-sm text-gray-500"> {timeAgo(createdAt)}</h3>
            {location && (
              <>
                <span className="text-gray-500"> - </span>
                <h3 className="text-sm text-gray-500">{location}</h3>
              </>
            )}
          </div>
        </div>
      </Link>
    </>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
