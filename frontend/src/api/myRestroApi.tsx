import axios from 'axios'
import { restaurantType } from '../type'
import { useMutation ,useQuery} from '@tanstack/react-query'
import {toast} from 'sonner'
export const useCreateMyRestaurant= () => {
    const createMyRestro=async(restroFormData: FormData):Promise<restaurantType> => {
    try {
        const token = localStorage.getItem("token")
        const response =await axios.post("/api/my/restaurant",restroFormData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    }catch(err){
        console.log("error creating restaurant")
        throw new Error("Error creating restaurant")
    }
}
    const {mutate:createRestro,isPending:isLoading,isError,isSuccess}= useMutation({
        mutationFn:createMyRestro,
        mutationKey:["createRerstaurant"]
    })
    if(isSuccess){
        toast.message("successfully created")
    }
    if(isError){
        toast.message("Error creating Restaurant ")
    }
    return {createRestro,isLoading}
}
export const useGetMyRestaurant= ()=> {
    const getMyRestaurant=async():Promise<restaurantType> => {
    try{
        const token= localStorage.getItem("token")
        const {data}= await axios.get("/api/my/restaurant",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    }catch(err){
        console.log("error geting restaurant info")
        throw new Error("error retriving restaurant information")
    }
}
    const {data:restaurant,isLoading}= useQuery({
        queryFn:getMyRestaurant,
        queryKey:["getRestaurant"]
    })
    return {restaurant,isLoading}
}
export const useUpdateMyRestaurant=()=> {
    try{
        const token= localStorage.getItem("token")
        const updateRestaurant= async(restroFormData:FormData):Promise<restaurantType>=> {
            const{data}= await axios.put("/api/my/restaurant",restroFormData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return data
        }
        const{mutate:updateRestro,isPending,isSuccess,isError}=useMutation({
            mutationFn:updateRestaurant,
            mutationKey:["Update Restaurant"], 
        })
        if(isSuccess){
         toast.success("Successfully updated")
             }
        if(isError){
           toast.error("Unable to update restaurant")
         }
         return {updateRestro,isPending}
    }catch(err){
        throw new Error("error updating user")
    }
}