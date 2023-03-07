import { Navigate, Outlet, useLocation } from "react-router-dom";

function CheckRole({ role }) {
  const local = useLocation();
  return localStorage.getItem("role") == role ? (
    <Outlet />
  ) : (
    <Navigate to={"/403"} state={{ from: local }} replace />
  );
}

export default CheckRole;
