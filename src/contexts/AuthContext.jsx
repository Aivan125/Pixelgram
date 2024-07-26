import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // get the user
  const { user, isGettingUser } = useGetCurrentUser();

  useEffect(() => {
    const checkAuthUser = () => {
      if (user && !isGettingUser) setIsAuthenticated(true);
      if (!user && !isGettingUser) setIsAuthenticated(false);
    };
    checkAuthUser();
  }, [user, isGettingUser]);

  const contextData = {
    isAuthenticated,
    user,
    isGettingUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const contextValue = useContext(AuthContext);
  if (contextValue === undefined)
    throw new Error("AuthContext was used outside of the AuthProvider");
  return contextValue;
};

export { AuthProvider, useAuth };
