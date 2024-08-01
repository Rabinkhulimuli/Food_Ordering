import axios from 'axios'
import React from "react";
import { useContext, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";

export interface formData {
  email: string;
  password: string;
}
export default function Register() {
  const [data1, setData] = useState<formData>({ email: " ", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const { login } = useContext<UserContextType>(UserContext);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (login) {
      navigate("/");
    }

  }, [login, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
       await axios.post('/user/my-user',data1)
  
      navigate('/login')
    }catch(err){
      
      console.log(err)
    }
  };
  return (
    <>
      <h2 className=" w-full text-center text-2xl font-black shadow">
        Register Now
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
      </form>
    </>
  );
}
