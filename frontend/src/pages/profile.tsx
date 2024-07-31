import {UserContext,UserContextType} from  '../userContext/userContextProvide'
import React, { useContext ,useState} from 'react'
import axios from 'axios'
interface userD{
    name:string  
    contact:number  
    address:string
    city:string
}
export default function Profile(){
    const {user}= useContext<UserContextType>(UserContext)
   const[userData,setUserData]=useState<userD>({name:'',contact:0,address:'',city:''})
   const setChange= (ev:React.ChangeEvent<HTMLInputElement>)=> {
    const{name,value}=ev.target
    setUserData((prev)=> {
        return {...prev,[name]:value}
    })
   }
   const updateForm=async (ev:React.FormEvent<HTMLFormElement> )=> {
    ev.preventDefault()
    const data = await axios.post("/profile",userData)
    console.log(data)
   }
    return (
        <>
        <span>This is a Profile section</span>
        <span>wellcome {user?.email}</span>
        <form onSubmit={updateForm} >
            <label className=" block" >Name</label>
            <input type='text' value={userData.name}  name='name' onChange={setChange} placeholder='Name' className=" shadow-md border mx-4 px-2" />
            <label className=" block" >Contact Number</label>
            <input type='tel' value={userData.contact} name='contact' onChange={setChange}  placeholder='phone' className=" shadow-md border mx-4 px-2" />
            <label className=" block" >Address</label>
            <input type='text' value={userData.address} name='address' onChange={setChange}  placeholder='Address' className=" shadow-md border mx-4 px-2" />
            <label className=" block" >city</label>
            <input type='text' value={userData.city} name='city' onChange={setChange}  placeholder='city' className=" shadow-md border mx-4 px-2" />
            <button>Sumbit</button>
        </form>
        </>
    )
}