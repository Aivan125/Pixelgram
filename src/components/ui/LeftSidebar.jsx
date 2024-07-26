import { Link } from "react-router-dom";
import Logo from "./Logo";
import Menu from "./MenuBottombar";
import Profile from "./Profile";
import MenuSidebar from "./MenuSidebar";
import Logout from "./Logout";

const LeftSidebar = () => {
  return (
    <nav className="py-8 max-md:hidden">
      <div className="flex h-full flex-col items-center justify-between gap-4">
        <div className="mt-4 flex flex-col items-center gap-10">
          <Logo />
          <Profile />
        </div>
        <MenuSidebar />
        <Logout />
      </div>
    </nav>
  );
};

export default LeftSidebar;
