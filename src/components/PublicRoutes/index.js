import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import StoreContext from "../../store/Context-provider";

const PublicRoutes = () => {
  const loggedIn = useContext(StoreContext).loggIn[0];

  return loggedIn ? <Navigate to="/movies" /> : <Outlet />;
};

export default PublicRoutes;
