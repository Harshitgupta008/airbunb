import { createContext, useContext } from "react";

export const Authcontext = createContext(); 

export const AuthProvider = ({children})=>{
    return <Authcontext.Provider>
        {children}
    </Authcontext.Provider>
}

export const UseAuth = ()=>{
    return useContext(Authcontext);
}