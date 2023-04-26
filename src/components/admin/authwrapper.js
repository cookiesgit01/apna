import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";

const AuthWrapper = () => {
  const location = useLocation(); // current location

  const adminLogged = localStorage.getItem("token");
  // const VendorLogged = localStorage.getItem("vendor_token");

  return adminLogged === null ||
    adminLogged === "" ||
    adminLogged === undefined ||
    adminLogged === "null" ||
    adminLogged === true ||
    adminLogged === "true" ? (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  ) : (
    <Outlet />
  );
};

export default AuthWrapper;
