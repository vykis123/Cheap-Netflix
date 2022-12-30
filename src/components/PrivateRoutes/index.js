import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import StoreContext from "../../store/Context-provider";

const PrivateRoutes = () => {
  const loggedIn = useContext(StoreContext).loggIn[0];

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
