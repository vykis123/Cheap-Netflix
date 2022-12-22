import { useState, createContext, useEffect, useCallback } from "react";

const StoreContext = createContext();

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retriveStoredData = () => {
  const email = localStorage.getItem("email");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const userName = localStorage.getItem("userName");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("email");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    email: email,
    duration: remainingTime,
    userName: userName,
  };
};

export const Authentication = (props) => {
  const storedData = retriveStoredData();
  const [loggedIn, setLoggedIn] = useState("");
  const [userName, setUserName] = useState("");

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userName");
    setLoggedIn(false);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (storedData) {
      setLoggedIn(true);
      setUserName(storedData.userName);
      logoutTimer = setTimeout(logoutHandler, storedData.duration);
    }
  }, [setLoggedIn, setUserName, logoutHandler, storedData]);

  const logInLocal = (email, expirationTime, userName) => {
    localStorage.setItem("email", email);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("userName", userName);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const value = {
    loggIn: [loggedIn, setLoggedIn],
    userName: [userName, setUserName],
    login: logInLocal,
    logout: logoutHandler,
  };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
