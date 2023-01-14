import { createContext, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuth: getCookie("isAuth") || false,
    token: getCookie("token") || null,
    name: getCookie("name") || null,
  });
  const handleLogin = ({ token, name }) => {
    setAuth({
      ...auth,
      isAuth: true,
      token: token,
      name: name,
    });
    setCookie("token", token);
    setCookie("name", name);
    setCookie("isAuth", true);
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      isAuth: false,
      token: null,
      name: null,
    });
    setCookie("token", null);
    setCookie("name", null);
    setCookie("isAuth", false);
  };
  return (
    <AppContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
};
