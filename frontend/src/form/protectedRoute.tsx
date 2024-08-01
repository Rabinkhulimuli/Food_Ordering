import { Outlet,Navigate } from "react-router-dom";
import {
    UserContext,
    UserContextType,
  } from "../userContext/userContextProvide";
import { useEffect ,useContext} from "react";
import axios from 'axios'
export default function  ProtectedRoute(){
    const {user,setUser,setLogin,login}= useContext<UserContextType>(UserContext)
    useEffect(()=> {
        try{
      const load=async()=> {
            const {data}= await axios.get('/user/profile')
            setUser(data)
            setLogin(true)

        }  
        load()    
        } catch(err){
            setLogin(false)
        }
        
        
    },[user,setUser,login,setLogin])
    return login?(<Outlet/>):(<Navigate to='/'/>)
}