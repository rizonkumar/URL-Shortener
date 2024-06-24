import { URLState } from "@/Context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = URLState();

  useEffect(() => {
    if (!isAuthenticated && !loading) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;
  if (isAuthenticated) return children;
  return null;
};

export default RequireAuth;
