import React from "react";
import { useAuth } from "context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, isLoaded } = useAuth();

  if(isLoaded) {
    if (!isAuthenticated) return <Navigate to="/login" />;
    return <Outlet />;
  }

  return null;
};

export default PrivateRoute;