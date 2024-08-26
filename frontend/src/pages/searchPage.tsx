import { useParams } from "react-router-dom";
import { useSearchRequest } from "../api/searchApi";
import SearchDetail from "../components/searchDetail";
import SearchCard from "../components/searchResult";
import SearchBox, { SearchForm } from "../components/searchBar";
import { useState } from "react";
import Pagination from "../components/pagination";
import CuisineFilter from "../components/cuisineFilter";
import SearchOption from "../components/searchOption";
export type SearchState={
    searchQuery: string;
    page:number;
    selectedCuisines:string[];
    sortOption:string
}
export default function SearchPage(){
    const{city}= useParams()
    const [searchState,setSearchState]= useState<SearchState>({
        searchQuery:"",
        page:1,
        selectedCuisines:[],
        sortOption:''
    })
    const [isExpanded,setIsExpanded]= useState<boolean>(false)
    const {results,isLoading}= useSearchRequest(searchState,city)
    if(isLoading){
        return <span>Loading ...</span>
    }
    if (!results?.data || !city){
        return <span>No search found.</span>
    }
    
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
    const onPageChange=(page:number)=> {
        setSearchState((prev)=> ({
            ...prev,page:page,
        }))
    }
    const setSelectedCuisine=(selectedCuisines:string[])=> {
        setSearchState((prev)=> ({
            ...prev,selectedCuisines:selectedCuisines,page:1
        }))
    }
    const setChangeOption=(value:string)=> {
        setSearchState((prev)=> ({
            ...prev,sortOption:value
        }))
    }
    return(
        <>
        
        <div className=" grid md:grid-cols-[250px_1fr]" >
            <CuisineFilter 
                onChange={setSelectedCuisine}
               
                sellectedCuisines={searchState.selectedCuisines}
                isExpanded={isExpanded}
                onExpandedClick={()=>{setIsExpanded(!isExpanded)}}
            />
            <div>
            <SearchBox onSubmit={handleSearch} 
                placeHolder="Search by Cuisines or Restaurant"
                onReset={resetForm}
                searchQuery={searchState.searchQuery}
            />
            <div className="flex flex-col lg:flex-row justify-between mx-2">
                <SearchDetail
                total={results?.pagination?.total}
                city={city}
            />
            <SearchOption
                sortOption={searchState.sortOption}
                onChange={setChangeOption}
            />
            </div>
            
           <SearchCard restaurants={results.data} />
            </div>
            
        </div>
            <Pagination page={results.pagination.page} pages={results.pagination.pages} onPageChange={onPageChange} />
        </>
    )
}