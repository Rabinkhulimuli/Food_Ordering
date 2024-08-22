import { useParams } from "react-router-dom";
import { useSearchRequest } from "../api/searchApi";
import SearchDetail from "../components/searchDetail";
import SearchCard from "../components/searchResult";
export default function SearchPage(){
    const{city}= useParams()
    const {results,isLoading}= useSearchRequest(city)
    if(isLoading){
        return <span>Loading ...</span>
    }
    if (!results?.data || !city){
        return <span>No search found.</span>
    }
    const searchCard= results.data.map((eh)=> <SearchCard restaurant={eh} />)
    return(
        <>
        <div className=" grid grid-cols-[250px_1fr]" >
            <div>
                insert cuisine here
            </div>
            <div>
            <SearchDetail
                total={results?.pagination?.total}
                city={city}
            />
           {searchCard}
            </div>
            
        </div>
           
        </>
    )
}