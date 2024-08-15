
import React from "react";
import { useContext, FormEvent, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";

import { useMutation} from "@tanstack/react-query";

import {
  loginUser
} from '../api/apiList'

export interface formData {
  email: string;
  password: string;
  
}
export default function Login() {
  const [data1, setData] = useState<formData>({ email: " ", password: "" });
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const { login, setLogin ,setUser} = useContext<UserContextType>(UserContext);
 
 

  const navigate = useNavigate();
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login, navigate]);

    const {mutate,isPending,error,isError}= useMutation({
  mutationFn:loginUser,
  mutationKey:["login"],
  onSuccess:(data)=> {
    setLogin(true)
    setUser(data)
  },
  onError:()=> {
    setLogin(false)
  }

})
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(data1)
    
 
  };


  return (
    <>
     
      <div className="w-full h-screen flex  items-center  justify-center">
        <div  className="  w-80  rounded-xl border border-4 shadow-lg bg-red-100">
        <h2 className=" w-full bg-green-300 rounded-2xl shadow-xl py-8 text-center  text-2xl font-black text-orange-700 border-b-2 border-orange-800">
        Log in
        
      </h2>
      
      <form onSubmit={handleSubmit} className="  px-6 py-8">
        <div>
           
           
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            value={data1.email}
            onChange={handleChange}
            required
            className="border-b-2 border-gray-500 rounded-md block w-1/2 hover:bg-gray-100  w-full"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={data1.password}
            onChange={handleChange}
            required
            className="border-b-2 border-gray-500 rounded-md block w-1/2 hover:bg-gray-100   w-full"
          />
        </div>
        <div className=" w-full text-center tracking-tight text-red-600 font-bold text-lg mt-1 " >{isError? (JSON.stringify(error.message)): '' } </div>
        <button className=" bg-teal-500 my-4 flex items-center justify-center w-full text-2xl font-bold rounded-lg text-white py-1 hover:bg-teal-800 " disabled={isPending? true:false} >
          {isPending? <span>login<img  className="w-6 animate-spin   inline mx-2" src="/loading.png"/> </span>:"Log In"}
        </button>
        <span className=" flex font-bold  items-center justify-center " >Dont have an account ? <Link to='/register' className="underline  mx-1 text-red-500"> Register</Link> </span>
      </form>
      
        </div>
      </div>
    </>
  );
}
