import { Outlet,Navigate } from "react-router-dom";
import {
    UserContext,
    UserContextType,
  } from "../userContext/userContextProvide";
import { useContext} from "react";

export default function  ProtectedRoute(){
    const {login}= useContext<UserContextType>(UserContext)
    
    return login?(<Outlet/>):(<Navigate to='/'/>)
}