import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { restaurantSearchResponse } from '../type'
import { SearchState } from '../pages/searchPage'
export const useSearchRequest= (searchState:SearchState,city?:string)=> {
    try{
    const createSearchReq= async():Promise<restaurantSearchResponse>=> {
            const params= new URLSearchParams()
            params.set("searchQuery",searchState.searchQuery)
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