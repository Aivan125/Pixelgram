import BottomNavbar from "@/components/ui/BottomNavbar";
import TopNavbar from "@/components/ui/TopNavbar";

import { Outlet } from "react-router-dom";
import LeftSidebar from "../../../components/ui/LeftSidebar";
import { useLogout } from "../hooks/useLogout";
import SpinnerFullPage from "@/components/ui/SpinnerFullPage";
import RightSidebar from "@/components/ui/RightSidebar";

const AppLayout = () => {
  const { isLoggingOut } = useLogout();

  if (isLoggingOut) return <SpinnerFullPage />;
  return (
    <div className="h-screen px-4 md:grid md:grid-cols-main-layout">
      <TopNavbar />
      <LeftSidebar />
      <main className="p h-full">
        <div className="mx-1 h-screen border-[1px] border-b-0 border-l border-r border-t-0 border-gray-700">
          <Outlet />
        </div>
      </main>
      <RightSidebar />
      <BottomNavbar />
    </div>
  );
};

export default AppLayout;
