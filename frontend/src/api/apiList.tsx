import { formData } from "../pages/login";
import axios from 'axios'


export interface loginResponse{
  
        id:string,
        email:string,
}
export interface profileResponse {
    email: string;
    id:string
    name?: string;
    contact?: number;
    address?: string;
    city?: string;
  }
  export interface profileUpdateResponse {
    
    name?: string;
    contact?: number;
    address?: string;
    city?: string;
  }
export interface postResponse{
    email:string,
    password:string
}
export const postUser=async(data1:formData):Promise<postResponse> => {
    try{
        const {data}= await axios.post('/user/my-user',data1)
        return data
    }catch(error){
        console.log(error)
        throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
    
}

export const loginUser = async (data1: formData): Promise<loginResponse> => {
    try {
        const {data}= await axios.post('/user/user-loggin',data1);

        return data
    } catch (error) {
        if(axios.isAxiosError(error)){
            const customError=error?.response?.data?.msg||"Unexpected Error"
            throw new Error(customError)
        }
        else{
            throw new Error("Something went Wrong")
        }
    }
};


export const getProfile = async (): Promise<profileResponse> => {
    try{
        const {data}= await axios.get('/user/profile')
    return data
    }catch(err){
        throw new Error("Error getting profile")
    }
    
  };
  export const updateProfile= async(data:profileUpdateResponse):Promise<profileUpdateResponse> => {
    try{
        await axios.post('/user/profile',data)
    return data
    }catch(err){
        throw new Error("Error updating profile ")
    }
    
  }