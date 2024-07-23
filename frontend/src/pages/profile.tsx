import { useQuery } from "react-query"
import { useContext } from "react"
import { UserContext,UserContextType } from "../userContext/userContextProvide"
export default function Profile(){
     
    const {user,setUser}=useContext<UserContextType>(UserContext)
    
        const {data,isLoading}= useQuery({
            queryKey:["getProfile"],
            queryFn:async()=>{
                const response = await fetch("http://localhost:5000/user/profile",
                    {credentials:'include'}
            )
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
        }
        })
        if(isLoading){
            return <div>Loading ...</div>
        }

    return(
        <>
            <h1>Your Profile </h1>
            <span>Hey {user}</span>
        </>
    )
}