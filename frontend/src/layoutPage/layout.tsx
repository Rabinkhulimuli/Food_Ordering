import { Outlet } from "react-router-dom";

import Header from "../pages/header";
import Footer from "../pages/footer";
export default function Layout(){
    
    return (
        <>
        <Header/>
        <Outlet  />
        <Footer/>
        </>
    )
}