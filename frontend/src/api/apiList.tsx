import { formData } from "../pages/login";
export interface loginResponse{
    token:string,
    user:{
        id:string,
        email:string,

    }
}
export interface profileResponse{
    id:string,
    email:string
}
export interface postResponse{
    email:string,
    password:string
}
export const postUser=async(data:formData):Promise<postResponse> => {
    try{
const response = await fetch("http://localhost:5000/user/my-user",{
        method:'POST',
        headers :{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    })
    if(!response.ok){
        const errorData= await response.json()
        throw new Error(errorData.msg || 'Network response was not okay');
    }
    const resText= await response.text()
    
    if(resText.length <= 0){
        return {email:'',password:''}
    }
    const resData=JSON.parse(resText)
    
    return resData
    }catch(error){
        throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
    
}

export const loginUser = async (data: formData): Promise<loginResponse> => {
    try {
        const response = await fetch("http://localhost:5000/user/user-loggin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Network response was not okay');
        }

        const loginData: loginResponse = await response.json();
        return loginData;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
};


export const getProfile=async(token: string):Promise<profileResponse> => {
    const response= await fetch("http://localhost:5000/user/profile",{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
    
    })
    if(!response.ok){
        throw new Error("error retriving user information")
    }
    const resData:profileResponse= await response.json()
    return resData
}

