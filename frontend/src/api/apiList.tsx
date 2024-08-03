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
        throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
    
}

export const loginUser = async (data1: formData): Promise<loginResponse> => {
    try {
        const {data}= await axios.post('/user/user-loggin',data1);

        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
};


export const getProfile = async (): Promise<profileResponse> => {
    const {data}= await axios.get('/user/profile')
    return data
  };
  export const updateProfile= async(data:profileUpdateResponse):Promise<profileUpdateResponse> => {
    await axios.post('/user/profile',data)
    return data
  }