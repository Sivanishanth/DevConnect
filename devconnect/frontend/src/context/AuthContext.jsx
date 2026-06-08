import { createContext, useState, useContext } from "react";

const AuthContext = createContext()

export function AuthProvider({children}){
    const [isLoggedIn ,setLoggedIn] = useState(
        !!localStorage.getItem('token')
    )

    const login = (token)=>{
        localStorage.setItem('token' , token)
        setLoggedIn(true)
    }

    const logOut = ()=>{
        localStorage.removeItem('token')
        setLoggedIn(false)
    }
    return(
        <AuthContext.Provider value={{isLoggedIn,login,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}