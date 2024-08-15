import axios from 'axios'
import { restaurantType } from '../type'
import { useMutation } from '@tanstack/react-query'
export const useCreateMyRestaurant= () => {
    const createMyRestro=async(restroFormData: FormData):Promise<restaurantType> => {
    try {
        const response =await axios.post("/api/my/restaurant",restroFormData)
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
        console.log("restaurant created successfully")
    }
    if(isError){
        console.log("error creating Restaurant ")
    }
    return {createRestro,isLoading}
}