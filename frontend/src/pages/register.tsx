import React,{useContext} from "react";
import {  FormEvent,useState } from "react";
import {Navigate,useNavigate ,Link } from "react-router-dom";
import { postUser } from "../api/apiList";
import { useMutation } from "@tanstack/react-query";
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
  const{login}=useContext<UserContextType>(UserContext)
  const navigate=useNavigate()
  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: postUser,
    mutationKey: ["registerUser"],
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsync(data1);
    } catch (err) {
      console.log(err);
    }
  };
  if (isSuccess) {
    navigate("/login");
  }
if (login){
  return <Navigate to='/'/>
}
  return (
    <>
      
      <div className="w-full h-screen flex  items-center justify-center">
        <div className="  w-80  rounded-xl border border-4 shadow-lg bg-orange-50">
          <h2 className=" w-full bg-white rounded-2xl shadow-xl py-8 text-center  text-2xl font-black text-orange-700 border-b-2 border-orange-800">
            Create a new account
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
            <div className=" w-full text-center tracking-tight text-red-600 font-bold text-lg mt-1 ">
              {isError ? JSON.stringify(error.message) : ""}{" "}
            </div>
            <button
              className=" bg-teal-500 my-4 w-full text-2xl font-bold rounded-lg text-white py-1 hover:bg-teal-800 "
              disabled={isPending ? true : false}
            >
              {isPending ?  <span>Sign.. <img  className="w-6 animate-spin   inline mx-2" src="/loading.png"/> </span> : "Sign Up"}
            </button>
            <span className=" flex font-bold  items-center justify-center ">
              Already have an account ?{" "}
              <Link to="/login" className="underline  mx-1 text-red-500">
                Log in
              </Link>{" "}
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
