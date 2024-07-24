import React ,{ createContext,useState } from "react";
import PropTypes from 'prop-types'
interface UserContextProviderProps{
    children:React.ReactNode
}
export interface UserContextType{
    user:{
        id:string,
        email:string
    }  
    setUser:React.Dispatch<React.SetStateAction<{id:string,email:string}>>
    login:boolean
    setLogin:React.Dispatch<React.SetStateAction<boolean>>
    token:string | null
    setToken:React.Dispatch<React.SetStateAction<string>>
}

export const UserContext =createContext<UserContextType >({
    user:{
        id:'',
        email:''
    },
    setUser:()=> {},
    login:false  ,
    setLogin:()=> {},
    token:'',
    setToken:()=> {},
})
export default function UserContextProvider({children}:UserContextProviderProps){
    const[login,setLogin]=useState<boolean>(false)
    const[user,setUser]=useState<{email:string,id:string}>({email:'',id:''})
    const[token,setToken]= useState<string>('')
    return (
        <UserContext.Provider value={{login,setLogin,user,setUser,token,setToken}}>
            {children}
        </UserContext.Provider>
    )
}

UserContextProvider.propTypes={
    children: PropTypes.node.isRequired,
}