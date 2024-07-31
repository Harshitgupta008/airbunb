import { createContext, useContext, useEffect, useState } from "react";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setUserData] = useState("");
    const isLoggedIn = !!token;

    const GenrateToken = (tokens) => {
        const addToken = localStorage.setItem("token", tokens);
        setToken(tokens);
        return addToken;
    }

    const LoggoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    const GetUserAuth = async () => {
        try {
            const response = await fetch("/api/UserVerfytoken", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.status === 400) {
                return console.log("token error")
            } else if (response.ok) {
                const AuthData = await response.json();
                return setUserData(AuthData.data);
            }else{
                return console.log("error in api calling in getAuthUSer")
            }

        } catch (error) {
            return console.log(`error in api calling in getAuthUSer - Auth.jsx :: ${error}`)
        }
    }

     

    
    useEffect(() => {
        GetUserAuth();
    }, [token, isLoggedIn, userData])
    return <Authcontext.Provider value={{ isLoggedIn, GenrateToken, LoggoutUser, token, userData }} >
        {children}
    </Authcontext.Provider>
}

export const UseAuth = () => {
    return useContext(Authcontext);
}