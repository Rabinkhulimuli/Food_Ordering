import { Outlet,Navigate } from "react-router-dom";
import { getProfile } from "../api/apiList";
import { useQuery } from "@tanstack/react-query";
import { useEffect,useContext } from "react";
import { UserContext } from "../userContext/userContextProvide";

export default function  ProtectedRoute(){
    const{setLogin}=useContext(UserContext)
    const {isSuccess,isLoading}=useQuery({
      queryFn:getProfile,
      queryKey:["getProfile"],
      
    })
    useEffect(()=> {
      if(isSuccess){
        setLogin(true)
      }
    },[setLogin,isSuccess])
   if(isLoading){
    return null
   }
   if(isSuccess){
    return <Outlet/>
   }
   return <Navigate to='/' replace />
}