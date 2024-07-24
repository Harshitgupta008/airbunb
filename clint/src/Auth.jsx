import { createContext, useContext, useEffect, useState } from "react";

export const Authcontext = createContext(); 

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem("token"));
    const isLoggedIn = !!token;

    const GenrateToken = (tokens)=>{
        const addToken = localStorage.setItem("token",tokens);
        setToken(tokens);
        return addToken;
    }

    const LoggoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    useEffect(()=>{

    },[token, isLoggedIn])
    return <Authcontext.Provider value={{isLoggedIn, GenrateToken, LoggoutUser}} >
        {children}
    </Authcontext.Provider>
}

export const UseAuth = ()=>{
    return useContext(Authcontext);
}