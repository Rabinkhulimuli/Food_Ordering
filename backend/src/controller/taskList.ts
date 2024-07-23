import {Request,Response} from 'express'
const NUser= require('../model/modelSchema')
const jwt = require('jsonwebtoken')
require ('dotenv').config()
const jwtSecret= process.env.JWT_SECRET as string
const createUser=async (req:Request,res:Response)=> {
    try{
        const data= await req.body
        const {email}= data
        const Nuser= await NUser.findOne({email})
        if(Nuser){
            res.status(404).json({msg:"user with this email already exist"})
        }else{
           const user= await NUser.create(data)
        res.status(200).json(user) 
        }
        
    }catch(err){
        res.status(404).json({msg:"error creating user"})
    }
    
}
const loggin=async (req:Request,res:Response)=> {
    try{
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        const {email,password}= req.body
        const userEmail= await NUser.findOne({email})
        console.log(userEmail.email)
        if(userEmail){
            if(email === userEmail.email){
            if(password === userEmail.password){
                jwt.sign({email:userEmail.email,id:userEmail._id},jwtSecret,{},(err :Error , token: string )=> {
                    if(err){
                        throw err
                    }
                    console.log(token)
                    res.cookie("token",token,{
                        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
                        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
                        sameSite: 'strict', // Required for cross-site cookies, adjust based on your setup
                      
                    } ).status(200).json({email:userEmail.email,id:userEmail._id})
                })
            } else{
                res.status(200).json({msg:"Incorrect password"})
            }
        }else{
            res.status(200).json({msg:"User wasnt found"})
        }
        } else {
            res.status(404).json("user not found")
        }
        
    }catch(err){
        res.status(404).json({msg:"error getting user"})
    }
}
const getProfile= async (req: Request, res: Response) => {
    try {
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        const {token} =await req.headers
        console.log(token)
        res.json({msg:token})
       /*  const{ token }= req.cookies

        if (!token) {
            return res.status(401).json({ msg: "No token provided" }); // Use 401 for unauthorized
        }

        jwt.verify(token, jwtSecret, (err: Error | null, user: any) => {
            if (err || !user) {
                return res.status(401).json({ msg: "Invalid token", error: err?.message });
            }

            return res.status(200).json({ data: user });
        }); */
    } catch (err) {
        console.error("Error getting user profile:", err);
        return res.status(500).json({ msg: "Error getting user profile" });
    }
};




module.exports= {
    createUser,
    getProfile,
    loggin,
}