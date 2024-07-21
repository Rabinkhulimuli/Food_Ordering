import {Request,Response} from 'express'
const NUser= require('../model/modelSchema')
const createUser=async (req:Request,res:Response)=> {
    try{
        const data= await req.body
        const user= await NUser.create(data)
        res.status(200).json(user)
    }catch(err){
        res.status(404).json({msg:"error creating user"})
    }
    
}
const getProfile=(req:Request,res:Response)=> {
    try{
        res.status(200).json({email:"User Profile"})
    }catch(err){
        res.status(404).json({msg:err})
    }
    
}

module.exports= {
    createUser,
    getProfile
}