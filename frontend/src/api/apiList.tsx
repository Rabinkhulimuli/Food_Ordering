import { formData } from "../pages/login";
import axios from "axios";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { profileFormType } from "../form/profileForm";
import { UserD } from "../type";
import { toast } from "sonner";
export interface loginResponse {
  id: string;
  email: string;
}


export interface postResponse {
  email: string;
  password: string;
}
export const postUser = async (data1: postResponse): Promise<postResponse> => {
  try {
    const { data } = await axios.post("/user/my-user", data1);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};

export const loginUser = async (data1: formData): Promise<loginResponse> => {
  try {
    const { data } = await axios.post("/user/user-loggin", data1);

    localStorage.setItem("token", data.token);

    return { id: data.id, email: data.email };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const customError = error?.response?.data?.msg || "Unexpected Error";
      throw new Error(customError);
    } else {
      throw new Error("Something went Wrong");
    }
  }
};

export const useGetMyProfile=()=> {
  const getProfile = async (): Promise<UserD> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/user/profile", {
      headers: {
        Authorization: token ? `Bearer ${token}` : " ",
      },
    });
    return data;
  } catch (err) {
    throw new Error("Error getting profile");
  }
  
};
const {data:response,isLoading,isSuccess}=useQuery({
  queryFn:getProfile,
  queryKey:["getprofile"]
})
return {response,isLoading,isSuccess}
}

export const useUpdateProfile=()=> {
  try{
    const queryClient=useQueryClient()
    const token = localStorage.getItem("token")
    const updateProfile=async(data:profileFormType):Promise<profileFormType> => {
      const res= await axios.put("/user/profile",data,{
        headers: {
          Authorization: token ? `Bearer ${token}` : " ",
        },
      }) 
      return res.data
    }
    const {mutate:response,isPending}= useMutation({
      mutationFn:updateProfile,
      mutationKey:["updateProfile"],
      onSuccess:()=> {
        toast.message("Successfully Updated")
        queryClient.invalidateQueries({
          queryKey:["getprofile"]
        })}
    })
    return{response,isPending}
  }
  catch(err){
    throw new Error("error creating profile")
  }
  
}
export const logOut = async () => {
  try {
    await axios.post("/user/logout");
    localStorage.removeItem("token");
  } catch (err) {
    console.log("error logging out");
  }
};
