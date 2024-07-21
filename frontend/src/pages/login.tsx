import { useMutation } from "react-query";
import React from "react";
import { useContext, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";
import { postUser } from "../api/apiList";
export interface formData {
  email: string;
  password: string;
}
export default function Login() {
  const [data, setData] = useState<formData>({ email: " ", password: "" });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const { login, setLogin } = useContext<UserContextType>(UserContext);
  const postData = useMutation(postUser, {
    onSuccess: () => {
      console.log("user created successfully");
      setLogin(true);
    },
    onError: (err) => {
      console.log("error creating user", err);
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postData.mutate(data);
  };
  return (
    <>
      <h2 className=" w-full text-center text-2xl font-black shadow">
        Log in to your account
      </h2>
      <form onSubmit={handleSubmit} className=" bg-indigo-200 px-6 py-8">
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="xyz@gmail.com"
            value={data.email}
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
            value={data.password}
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
