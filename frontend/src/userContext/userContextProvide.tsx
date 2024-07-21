import React ,{ createContext,useState } from "react";
import PropTypes from 'prop-types'
interface UserContextProviderProps{
    children:React.ReactNode
}
export interface UserContextType{
    user:string  
    setUser:React.Dispatch<React.SetStateAction<string>>
    login:boolean
    setLogin:React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext =createContext<UserContextType >({
    user:" ",
    setUser:()=> {},
    login:false  ,
    setLogin:()=> {}
})
export default function UserContextProvider({children}:UserContextProviderProps){
    const[login,setLogin]=useState<boolean>(false)
    const[user,setUser]=useState<string>(" ")
    return (
        <UserContext.Provider value={{login,setLogin,user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

UserContextProvider.propTypes={
    children: PropTypes.node.isRequired,
}