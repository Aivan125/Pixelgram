import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SpinnerFullPage from "./SpinnerFullPage";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { useAuth } from "@/contexts/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, isGettingUser } = useGetCurrentUser();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user && !isGettingUser) navigate("sign-in");
  }, [navigate, isGettingUser, user]);

  if (isGettingUser) return <SpinnerFullPage />;
  if (user) return children;
};

export default PrivateRoutes;
