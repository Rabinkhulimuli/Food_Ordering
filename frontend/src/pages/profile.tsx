/* import { useMutation,useQuery} from "@tanstack/react-query"
import { useContext,useEffect } from "react"
import { UserContext,UserContextType } from "../userContext/userContextProvide"
import { getProfile,profileResponse } from "../api/apiList"
export default function Profile(){
    
    const {user,setUser,token}=useContext<UserContextType>(UserContext)
    
  const {mutate,isError,isSuccess}= useMutation<profileResponse,Error,string>({
        mutationFn:getProfile,
        onSuccess:(data:profileResponse)=> {
            setUser(data)
            console.log("user retrived successfully")
        },
        onError:(err:Error)=> {
            console.log(err)
        }
    })
    useEffect(()=> {
        if(token){
            mutate(token)
        }
     },[token,mutate])
    
    if(isError){
        return(<div>Error loading page</div>)
    }    
        
    return(
        <>
            <h1>Your Profile </h1>
            <span>Hey {user.email}</span>
        </>
    )
} */

// components/Profile.tsx
import { useQuery } from "@tanstack/react-query";
import { useContext,useEffect } from "react";
import { UserContext, UserContextType } from "../userContext/userContextProvide";
import { profileResponse } from "../api/apiList";

export default function Profile() {
    const { user, setUser, token } = useContext<UserContextType>(UserContext);
    
    const { data, error, isError, isLoading } = useQuery<profileResponse, Error>({
        queryKey:['profile'], // query key
        queryFn:async () => {
            if (!token) {
                throw new Error('No token available');
            }
            const response = await fetch("http://localhost:5000/user/profile", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch profile');
            }

            return response.json();
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <>
            <h1>Your Profile</h1>
            <span>Hey {data?.email}</span>
        </>
    );
}
