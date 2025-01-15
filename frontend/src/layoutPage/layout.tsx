import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../pages/header";
import Footer from "../pages/footer";
import { SearchState } from "../pages/searchPage";
import { useSearchRequest } from "../api/searchApi";
export default function Layout(){
    const [searchState]= useState<SearchState>({
        searchQuery:"",
        page:1,
        selectedCuisines:[],
        sortOption:''
    })
    useSearchRequest(searchState)
    return (
        <>
        <Header />
        <Outlet  />
        <Footer/>
        </>
    )
}