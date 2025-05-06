import { Navigate, Outlet } from "react-router-dom";

const isLogined = () => !!sessionStorage.getItem("authKey");

const ProtectedRoute = () => {
  return isLogined() ? <Outlet /> : <Navigate to="/start/form" replace />;
};

export default ProtectedRoute;