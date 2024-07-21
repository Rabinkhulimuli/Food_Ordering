import { useQuery } from "react-query"
import { useContext ,useEffect} from "react"
import { UserContext,UserContextType } from "../userContext/userContextProvide"
export default function Profile(){
     
    const {user,setUser}=useContext<UserContextType>(UserContext)
    
        const {data,isLoading}= useQuery({
            queryKey:["profile"],
            queryFn:async()=> await fetch("http://localhost:5000/user/profile")
        })
        if(isLoading){
            return <div>Loading ...</div>
        }

        console.log(data)
    return(
        <>
            <h1>Your Profile </h1>
            <span>Hey {user}</span>
        </>
    )
}