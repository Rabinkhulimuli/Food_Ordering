import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext,UserContextType } from "../userContext/userContextProvide"

interface changeType{
    change:boolean  
    setChange: React.Dispatch<React.SetStateAction<boolean>>
  }
export default function MobNavbar({change,setChange}:changeType){
    const{login,setLogin}=useContext<UserContextType>(UserContext)
    return (
        <>
        <div className=" relative  md:hidden flex-col w-1/2 right-0 ml-auto ">
          
          {change && (
            <div className="  w-full absolute z-10 -mt-32 py-4 bg-gray-500 flex flex-col items-center md:hidden border-l-4 border-solid border-orange-700 h-screen ">
              <div className="h-16 m-4" > </div>
              <button
                className="bg-yellow-200 w-full text-center hover:bg-red-500 m-1 pointer"
                onClick={() => setChange(() => false)}
              >
                close
              </button>
              {login && (
                <div className="w-full">
                  <Link
                    className="block bg-yellow-200  w-full text-center hover:bg-red-500 m-t-1"
                    to="/profile"
                  >
                    Profile
                  </Link>
                  <button onClick={()=> setLogin(false)} className="bg-yellow-200 w-full text-center hover:bg-red-500 my-1">
                    Log Out
                  </button>
                </div>
              )}
              {!login && (
                <Link to="/login" className="bg-yellow-200  w-full text-center hover:bg-red-500 m-1">
                  Log In
                </Link>
              )}
            </div>
          )}
        </div>
        </>
    )
}