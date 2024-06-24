import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/use-fetch";
import { createContext, useContext, useEffect } from "react";

const URLContext = createContext();

const URLProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <URLContext.Provider value={(user, fetchUser, loading, isAuthenticated)}>
      {children}
    </URLContext.Provider>
  );
};

export const URLState = () => {
  return useContext(URLContext);
};

export default URLProvider;
