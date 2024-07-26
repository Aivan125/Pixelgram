import { useLogout } from "@/features/auth/hooks/useLogout";
import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const Logout = () => {
  const { logoutSession, isLoggingOut } = useLogout();
  return (
    <Link title="logout">
      <button
        onClick={() => logoutSession()}
        className="flex flex-col items-center justify-center text-gray-300"
      >
        <MdOutlineLogout className="text-2xl text-purple-500 transition-all duration-150 hover:text-purple-400/90" />
        <span className="text-[10px] md:gap-4 md:text-lg">Logout</span>
      </button>
    </Link>
  );
};

export default Logout;
