import { useContext } from "react";
import StoreContext from "../../store/Context-provider";
import LogedNav from "./Loged-Nav";
import LogedoutNav from "./Logedout-Nav";

const Navigation = () => {
  const loggedIn = useContext(StoreContext).loggIn[0];

  return (
    <>
      {!loggedIn && <LogedoutNav />}
      {loggedIn && <LogedNav />}
    </>
  );
};

export default Navigation;
