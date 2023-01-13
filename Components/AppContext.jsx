import { createContext, useState } from "react";
import { setCookie } from 'cookies-next';

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const [auth,setAuth] = useState({
        isAuth: false,
        token: null,
        name:  null
    })
    const handleLogin = ({token,name}) => {
        setAuth({
            ...auth, 
            isAuth : true,
            token: token,
            name: name
        })
        setCookie("token",token)
    }
    const handleLogout = () => {
        setAuth({
            ...auth,
            isAuth : false,
            token: null,
            name: null
        })
    }
    return (
        <AppContext.Provider value={{auth, handleLogin,handleLogout}}>
            {children}
        </AppContext.Provider>
    )
}