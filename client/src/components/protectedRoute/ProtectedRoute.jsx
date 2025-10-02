import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/user/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/shop" />;
  }

  return children;
};

export default ProtectedRoute;
