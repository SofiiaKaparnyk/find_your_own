import React from "react";
import { useAuth } from "context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if(isLoading) return null;

  if (!isAuthenticated && !isLoading) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;