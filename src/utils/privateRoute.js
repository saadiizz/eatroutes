import React from "react";
import { Navigate } from "react-router-dom";

import { getToken, getRole } from "@utils/commonFunctions";

const PrivateRoute = ({ children, role = "" }) => {
  return getToken() ? (
    role.includes(getRole()) || role === "" ? (
      children
    ) : (
      <Navigate to="/page-not-found" />
    )
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
