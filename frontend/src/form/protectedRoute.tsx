import { Outlet,Navigate } from "react-router-dom";
import { useGetMyProfile } from "../api/apiList";
import { useEffect,useContext } from "react";
import { UserContext } from "../userContext/userContextProvide";

export default function  ProtectedRoute(){
    const{setLogin}=useContext(UserContext)
    const {isLoading,isSuccess}=useGetMyProfile()
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