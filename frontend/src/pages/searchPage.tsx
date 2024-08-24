import { useParams } from "react-router-dom";
import { useSearchRequest } from "../api/searchApi";
import SearchDetail from "../components/searchDetail";
import SearchCard from "../components/searchResult";
import SearchBox, { SearchForm } from "../components/searchBar";
import { useState } from "react";
export type SearchState={
    searchQuery: string;

}
export default function SearchPage(){
    const{city}= useParams()
    const [searchState,setSearchState]= useState<SearchState>({
        searchQuery:""
    })
    const {results,isLoading}= useSearchRequest(searchState,city)
    if(isLoading){
        return <span>Loading ...</span>
    }
    if (!results?.data || !city){
        return <span>No search found.</span>
    }
    const searchCard= results.data.map((eh)=> <SearchCard restaurant={eh} />)
    const handleSearch= (searchFormData:SearchForm)=> {
        setSearchState((prev)=> ({
            ...prev,searchQuery:searchFormData.searchQuery,
        }))
    }
    const resetForm=()=> {
        setSearchState((prev)=> ({
            ...prev,searchQuery:"",
        }))
    }
    return(
        <>
        
        <div className=" grid md:grid-cols-[250px_1fr]" >
            <div>
                "cuisines"
            </div>
            <div>
            <SearchBox onSubmit={handleSearch} 
                placeHolder="Search by Cuisines or Restaurant"
                onReset={resetForm}
                searchQuery={searchState.searchQuery}
            />
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