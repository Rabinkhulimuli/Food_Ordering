import { Outlet,Navigate } from "react-router-dom";
import { getProfile } from "../api/apiList";
import { useQuery } from "@tanstack/react-query";
export default function  ProtectedRoute(){
  
    const {isSuccess,isLoading}=useQuery({
      queryFn:getProfile,
      queryKey:["getProfile"],
      
    })
   if(isLoading){
    return null
   }
   if(isSuccess){
    return <Outlet/>
   }
   return <Navigate to='/' replace />
}