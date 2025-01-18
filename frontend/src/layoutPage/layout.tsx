import { Outlet } from "react-router-dom";
import Header from "../pages/header";
import Footer from "../pages/footer";

export default function Layout(){
    return (
        <>
        <Header />
        <div className="container mx-auto flex-1 py-10"><Outlet/> </div>
        <Footer/>
        </>
    )
}