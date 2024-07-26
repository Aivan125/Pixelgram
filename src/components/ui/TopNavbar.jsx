import Logo from "./Logo";
import ProfileAndLogout from "./ProfileAndLogout";

const TopNavbar = () => {
  return (
    <nav className="fixed right-0 top-0 z-10 h-16 w-full bg-gray-900/50 shadow-sm backdrop-blur-md md:hidden">
      <div className="flex h-16 flex-1 items-center justify-evenly gap-4 px-4">
        <Logo />
        <ProfileAndLogout />
      </div>
    </nav>
  );
};

export default TopNavbar;
