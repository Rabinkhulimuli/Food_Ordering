import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";
import MobNavbar from "./mobNavbar";
import Footer from "./footer";
import axios from 'axios'
type Props = {
  children: React.ReactNode;
};

export default function LandingPage({ children }: Props) {
  const [change, setChange] = useState(false);
  const { login, setLogin } = useContext<UserContextType>(UserContext);
  const handleLogout= ()=> {
    try{
      axios.post('/logout')
      setLogin(false)
    }catch(err){
      console.log("error loggin out")
    }
    
  }
  return (
    <>
      <div className=" ">
        <div
          style={change ? { opacity: "0.4", backgroundColor: "grey" } : {}}
          className="  border-b-4 border-orange-700  bg-white flex items-center justify-between space-between"
        >
          <h1 className="p-8 text-2xl  text-orange-700 font-black tracking-tight">
            MernEats.com
          </h1>
          {!login && (
            <div className="hidden md:block ">
              <Link
                to="/login"
                className="p-4 text-lg font-bold text-orange-700 rounded-xl hover:bg-gray-500"
              >
                Log In
              </Link>
             
            </div>
          )}
          {login && (
            <div className="hidden md:block ">
              <button
                onClick={handleLogout}
                className="p-4 text-lg font-bold text-orange-700 rounded-xl hover:bg-gray-500"
              >
                Log Out
              </button>
            </div>
          )}
          <div className=" md:hidden">
            <img
            className="w-6 block ml-auto mr-4  "
            style={change ? { display: "none" } : { display: "block" }}
            onClick={() => setChange(() => true)}
            src="/drop_down.svg"
          ></img>
          </div>
          
        </div>
        <MobNavbar change={change} setChange={setChange} handleLogout={handleLogout}/>
      </div>

      <div
        style={change ? { opacity: "0.4", backgroundColor: "grey" } : {}}
        className=""
      >
        {children}
          <Footer/>
      </div>
    </>
  );
}
