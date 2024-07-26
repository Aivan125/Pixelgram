import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const MenuSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-start justify-center gap-12">
      {bottombarLinks.map((item) => {
        const isActive = pathname === item.route;
        return (
          <Link
            to={item.route}
            className={`flex items-center justify-center gap-4 rounded-md px-2 py-[4px] ${isActive && "bg-purple-600/70"}`}
            key={item.label}
            title={item.label}
          >
            {
              <item.icon
                className={`text-4xl text-purple-500 transition-all duration-150 hover:text-purple-400/90 ${isActive && "brightness-0 invert transition"}`}
              />
            }
            <p>{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuSidebar;
