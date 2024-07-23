import { formData } from "../pages/login";
export const postUser=async(data:formData)=> {
    
    const response = await fetch("http://localhost:5000/user/my-user",{
        method:'POST',
        headers :{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    })
    if(!response.ok){
        throw new Error('Network response wasnt okay')
    }
    const resText= await response.text()
    
    if(resText.length <= 0){
        return {}
    }
    const resData=JSON.parse(resText)
    
    return resData
}
export const loginUser= async(data:formData)=> {
 const response= await fetch("http://localhost:5000/user/user-loggin",{
    method:'POST',
    headers: {
        'Content-Type':'application/json',
    },
    body:JSON.stringify(data)
 })
 if(!response.ok){
    throw new Error("Network response wasnt okay")
 }
}

