import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation ,useQueryClient} from "@tanstack/react-query";
import { UserContext, UserContextType } from "../userContext/userContextProvide";
import { getProfile, updateProfile } from "../api/apiList";

interface UserD {
  name?: string;
  contact?: number;
  address?: string;
  city?: string;
}

export default function ProfileForm() {
  const { user,setUser } = useContext<UserContextType>(UserContext);
  
  const queryClient=useQueryClient()
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["getprofile"],
    enabled:!!user,
    queryFn: getProfile,
  });

  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profileUpdate"],
    onSuccess:()=> {
      queryClient.invalidateQueries({
        queryKey:["getprofile"]
      })
    }
  });

  const [userData, setUserData] = useState<UserD>({
    name: " ",
    contact: undefined,
    address: " ",
    city: " ",
  });
  useEffect(()=> {
   
    if(isSuccess && data){
      setUser(data)
      setUserData(
        {name:data?.name || '',
        contact:data?.contact || undefined,
        address:data?.address || '',
        city:data?.city || ''
      }
      )
    }
  },[data,isSuccess,setUser])
  const setChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    console.log("form data changing")
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateForm = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    await mutateAsync(userData);
    navigate("/");
  };
  return (
    <div className="bg-gray-200 px-4">
      <div className="shadow bg-gray-100 px-4">
        <span className="block text-xl font-bold">User Profile Form</span>
        <span>View and change your profile information</span>
      </div>
      <label>Email</label>
      <p  className="mx-4 z-0 w-full bg-red-200 px-8 font-bold" >{data?.email ||'Couldnt retrive your email'} </p>
      {isLoading && <div className=" w-full text-center bg-red-200 m-4 shadow-md" >Loading ...</div>}
      
      <form onSubmit={updateForm}>
        <label className="block">Name</label>
        <input
          type="text"
          value={userData.name}
          name="name"
          onChange={setChange}
          placeholder="Name"
          className="shadow-md border mx-4 px-2 w-full"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-auto w-full">
            <label className="block">Contact Number</label>
            <input
              type="tel"
              value={userData.contact}
              name="contact"
              onChange={setChange}
              placeholder="Phone"
              className="shadow-md border mx-4 px-2 w-full"
            />
          </div>
          <div className="flex-auto w-full">
            <label className="block">Address</label>
            <input
              type="text"
              value={userData.address}
              name="address"
              onChange={setChange}
              placeholder="Address"
              className="shadow-md border mx-4 px-2 w-full"
            />
          </div>
          <div className="flex-auto w-full">
            <label className="block">City</label>
            <input
              type="text"
              value={userData.city}
              name="city"
              onChange={setChange}
              placeholder="City"
              className="shadow-md border mx-4 px-2 w-full"
            />
          </div>
        </div>
        <button className="bg-orange-700 px-8 py-2 rounded-xl font-bold text-white hover:bg-orange-500 my-2">
          Submit
        </button>
      </form>
    </div>
  );
}
