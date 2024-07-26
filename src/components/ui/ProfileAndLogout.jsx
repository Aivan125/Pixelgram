import { MdOutlineLogout } from "react-icons/md";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const ProfileAndLogout = () => {
  return (
    <div className="flex flex-1 items-center justify-end gap-4">
      <Logout />
      <Profile />
    </div>
  );
};

export default ProfileAndLogout;
