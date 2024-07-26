import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const MenuBottombar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full items-center justify-between">
      {bottombarLinks.map((item) => {
        const isActive = pathname === item.route;
        return (
          <Link
            to={item.route}
            className={`flex flex-col items-center justify-center gap-1 rounded-md px-2 py-[4px] ${isActive && "bg-purple-600/70"}`}
            key={item.label}
          >
            {
              <item.icon
                className={`text-2xl text-purple-500 transition-all duration-150 hover:text-purple-400/90 ${isActive && "brightness-0 invert transition"}`}
              />
            }
            <p>{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuBottombar;
