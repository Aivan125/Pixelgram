import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center xl:grid xl:grid-cols-2">
      <Outlet />
      <img
        src="/assets/icons/astronaut.svg"
        alt=""
        className="hidden h-screen bg-no-repeat object-contain object-center xl:block"
      />
    </div>
  );
};

export default AuthLayout;
