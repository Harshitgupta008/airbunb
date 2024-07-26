import { createContext, useContext, useEffect, useState } from "react";

export const Authcontext = createContext(); 

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [userData,setUserData] = useState("");
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

    const GetUserAuth = async ()=>{
        try {
            const UserVerifyData = await fetch("/api/UserVerfytoken",{
                method:"GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(UserVerifyData.status === 400){
                console.log("token error")
            }else if(UserVerifyData.ok){
                const AuthData = await UserVerifyData.json();
                setUserData(AuthData.data);
            }
            
        } catch (error) {
            console.log(`error in api calling in getAuthUSer - Auth.jsx :: ${error}`)
        }
    }

    useEffect(()=>{
        GetUserAuth();
    },[token, isLoggedIn])
    return <Authcontext.Provider value={{isLoggedIn, GenrateToken, LoggoutUser, userData}} >
        {children}
    </Authcontext.Provider>
}

export const UseAuth = ()=>{
    return useContext(Authcontext);
}