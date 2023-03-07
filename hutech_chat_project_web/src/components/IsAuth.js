import { Navigate, Outlet, useLocation } from "react-router-dom";

function IsAuth() {
  const local = useLocation();
  console.log(localStorage.getItem("accessToken"));
  return localStorage.getItem("accessToken") == "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/403" state={{ from: local }} replace />
  );
}

export default IsAuth;
