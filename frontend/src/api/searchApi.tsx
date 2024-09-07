import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { restaurantSearchResponse, restaurantType } from '../type'
import { SearchState } from '../pages/searchPage'
export const useSearchRequest= (searchState:SearchState,city?:string)=> {
    try{
    const createSearchReq= async():Promise<restaurantSearchResponse>=> {
            const params= new URLSearchParams()
            params.set("searchQuery",searchState.searchQuery)
            params.set("page",searchState.page.toString())
            params.set("selectedCuisines",searchState.selectedCuisines.join(","))
            params.set("sortOption",searchState.sortOption)
            const response= await axios.get(`api/restaurant/search/${city}?${params.toString()}`)

            return response.data   
    }
    const {isLoading,data:results}= useQuery({
        queryKey:["searchItems",searchState],
        queryFn:createSearchReq,
        enabled: !!city
    })
    return {results,isLoading}
}catch(err){
    throw new Error(JSON.stringify(err))
}
}
export const useGetRestaurantId= (restaurantId?:string)=> {
    const getRestaurantIdRequest= async():Promise<restaurantType> => {
        try{
             const {data}= await axios.get(`api/restaurant/${restaurantId}`)
             return data
        }catch(err){
            throw new Error("Failed to get Restaurant")
        }
       
    }
    const {data:restaurant,isLoading}= useQuery({
        queryKey:["fetchRestaurant"],
        queryFn:getRestaurantIdRequest,
        enabled:!!restaurantId
    })
    return {restaurant,isLoading}
}