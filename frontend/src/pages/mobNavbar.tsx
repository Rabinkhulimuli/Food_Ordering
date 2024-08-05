import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext,UserContextType } from "../userContext/userContextProvide"

interface changeType{
    change:boolean  
    setChange: React.Dispatch<React.SetStateAction<boolean>>
    handleLogout:()=> void
  }
export default function MobNavbar({change,setChange,handleLogout}:changeType){
    const{login}=useContext<UserContextType>(UserContext)
    return (
        <>
        <div className=" relative  md:hidden flex-col w-1/2 right-0 ml-auto ">
          
          {change && (
            <div className="  w-full absolute z-10 -mt-32 py-4 bg-gray-500 flex flex-col items-center md:hidden border-l-4 border-solid border-orange-700 h-screen ">
              
              <div className="h-16 py-16 bg-orange-600 text-white w-full flex items-center justify-center text-xl  text-center tracking-tight font-bold capitalize" >Wellcome to EatMuch.com </div>
             
              <button
                className=" w-full text-center hover:bg-orange-500  font-bold text-gray-100 py-2 text-lg capitalize border-b-4 border-orange-800 pointer"
                onClick={() => setChange(() => false)}
              >
                close
              </button>
              <Link to='/my-restaurant' className=" block w-full text-center font-bold text-gray-100 py-2 text-lg capitalize hover:bg-orange-500  border-b-4 border-orange-800 " >My restaurant</Link>
              {login && (
                
                <div className="w-full">
                  <Link to='/my-restaurant' className=" block w-full text-center font-bold text-gray-100 py-2 text-lg capitalize hover:bg-orange-500  border-b-4 border-orange-800 " >My restaurant</Link>
                  <Link
                    className="  block w-full text-center hover:bg-orange-500  font-bold text-gray-100 py-2 text-lg capitalize border-b-4 border-orange-800"
                    to="/profile"
                  >
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="  w-full text-center font-bold text-gray-100 py-2 text-lg capitalize hover:bg-orange-500  border-b-4 border-orange-800">
                    Log Out
                  </button>
                </div>
              )}
              {!login && (
                <Link to="/login" className="  w-full text-center hover:bg-orange-500  font-bold text-gray-100 py-2 text-lg capitalize border-b-4 border-orange-800">
                  Log In
                </Link>
              )}
            </div>
          )}
        </div>
        </>
    )
}