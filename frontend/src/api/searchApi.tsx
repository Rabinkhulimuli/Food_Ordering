import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { restaurantSearchResponse } from '../type'
export const useSearchRequest= (city?:string)=> {
    try{
    const createSearchReq= async():Promise<restaurantSearchResponse>=> {
       
            const response= await axios.get(`api/restaurant/search/${city}`)
            return response.data   
    }
    const {isLoading,data:results}= useQuery({
        queryKey:["searchItems"],
        queryFn:createSearchReq,
        enabled: !!city
    })
    return {results,isLoading}
}catch(err){
    throw new Error(JSON.stringify(err))
}

}