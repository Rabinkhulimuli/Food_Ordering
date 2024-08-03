
import React from "react";
import { useContext, FormEvent, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";
import axios from  'axios'

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

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      const data2= await axios.post('/user/user-loggin',data1)
      console.log(data2)
      setUser(data2.data)
      setLogin(true)
    }catch(err){
      console.log("error logging in")
    }
  };
  return (
    <>
      <h2 className=" w-full text-center text-2xl font-black shadow">
        Log in to your account
      </h2>
     
      <form onSubmit={handleSubmit} className=" bg-indigo-200 px-6 py-8">
        <div>
           
           <div></div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            value={data1.email}
            onChange={handleChange}
            required
            className="border block w-1/2 hover:bg-gray-100 mx-4 shadow"
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
            className="border block w-1/2 hover:bg-gray-100 mx-4 shadow"
          />
        </div>
        <button className=" bg-teal-500 my-4 w-full text-3xl font-bold text-white py-1 ">
          Submit
        </button>
        <span className=" flex font-bold text-white items-center justify-center " >Dont have an account <Link to='/register' className="underline  mx-1 text-red-500"> Register</Link> </span>
      </form>
      
    </>
  );
}
