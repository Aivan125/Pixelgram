import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { Spinner } from "@nextui-org/spinner";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isGettingUser } = useGetCurrentUser();

  if (isGettingUser) return <Spinner />;
  return (
    <Link to={`profile/${user.$id}`} className="flex gap-2">
      <img
        src={
          user.avatarUrl || "../../../public//assets/images/avatar-default.jpeg"
        }
        alt="profile"
        className="h-10 w-10 rounded-full md:h-20 md:w-20"
      />
      <div className="i flex w-24 flex-col items-center justify-center">
        <h3 className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-gray-400 md:text-lg">
          {user.name.split(" ")[0]}
        </h3>
        <h3 className="text-sm font-semibold text-gray-400 md:text-lg">
          @{user.username}
        </h3>
      </div>
    </Link>
  );
};

export default Profile;
