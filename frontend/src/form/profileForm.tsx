import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";
import React, { useContext, useState,useEffect } from "react";
import axios from "axios";

interface userD {
  name: string;
  contact: number;
  address: string;
  city: string;
}
export default function ProfileForm() {
  const { user, setUser } = useContext<UserContextType>(UserContext);
    useEffect(()=> {
        const profile= async()=> {
            const {data}= await axios.get('/profile')
            setUser(data)
            setUserData((prev)=> {

                return {...prev,name:data?.name, city:data?.city,
                    address: data?.address,
                    contact: data?.contact,}
            })
        }
        profile()
    },[user,setUser])
  const [userData, setUserData] = useState<userD>({
    name: "",
    contact: 0,
    address: "",
    city: "",
  });

  const setChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const updateForm = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = await axios.post("/profile", userData);
    console.log(data);
  };
  return (
    <>
      <div className=" bg-gray-200 px-4">
        <div className="shadow bg-gray-100 px-4">
          <span className="block text-xl font-bold ">User Profile Form</span>
          <span>view and change your profile information</span>
        </div>
        <label>Email</label>
        <input type="text" value={user.email} disabled className=" mx-4 shadow-xl w-full bg-red-200 px-8 font-bold "  />
        <form onSubmit={updateForm}>
          <label className=" block">Name</label>
          <input
            type="text"
            value={userData.name}
            name="name"
            onChange={setChange}
            placeholder="Name"
            className=" shadow-md border mx-4 px-2 w-full"
          />
          <div className=" flex flex-col md:flex-row gap-4" >
            <div className="flex-auto w-full" >
              <label className=" block">Contact Number</label>
              <input
                type="tel"
                value={userData.contact}
                name="contact"
                onChange={setChange}
                placeholder="phone"
                className=" shadow-md border mx-4 px-2 w-full"
              />
            </div>
            <div className="flex-auto w-full" >
              <label className=" block">Address</label>
              <input
                type="text"
                value={userData.address}
                name="address"
                onChange={setChange}
                placeholder="Address"
                className=" shadow-md border mx-4 px-2 w-full"
              />
            </div>
            <div className="flex-auto w-full" >
              <label className=" block">City</label>
              <input
                type="text"
                value={userData.city}
                name="city"
                onChange={setChange}
                placeholder="city"
                className=" shadow-md border mx-4 px-2 w-full"
              />
            </div>
          </div>

          <button className="bg-orange-700 px-8 py-2 rounded-xl font-bold text-white hover:bg-orange-500 my-2 " >Sumbit</button>
        </form>
      </div>
    </>
  );
}
