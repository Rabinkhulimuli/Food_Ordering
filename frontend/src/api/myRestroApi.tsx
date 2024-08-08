import axios from 'axios'
import { restaurantType } from '../type'
import { restaurantFormData } from '../form/restaurant/restaurantForm'
import { useMutation } from '@tanstack/react-query'
export const useCreateMyRestaurant= async() => {
    const createMyRestro=async(restroFormData: restaurantFormData):Promise<restaurantType> => {
    try {
        const response =await axios.post("/api/my/restaurant",restroFormData,{
            headers:{
                Authorization:"is this working or not"
            }
        })
        return response.data
    }catch(err){
        console.log("error creating restaurant")
        throw new Error("Error creating restaurant")
    }
}
    const {mutate,isPending:isLoading,isError,isSuccess}= useMutation({
        mutationFn:createMyRestro,
        mutationKey:["createRerstaurant"]
    })
    if(isSuccess){
        console.log("restaurant created successfully")
    }
    if(isError){
        console.log("error creating Restaurant ")
    }
    return {mutate,isLoading}
}