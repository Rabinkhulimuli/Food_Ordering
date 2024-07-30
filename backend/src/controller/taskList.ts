import {Request,Response} from 'express'
const NUser= require('../model/modelSchema')
const bcrypt=require('bcryptjs')
const bcryptSalt= bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
require ('dotenv').config()
const jwtSecret= process.env.JWT_SECRET as string
const createUser=async (req:Request,res:Response)=> {
    try{
        const {email,password}= await req.body
        
        const Nuser= await NUser.findOne({email})
        if(Nuser){
            res.status(404).json({msg:"user with this email already exist"})
        }else{
           const user= await NUser.create({
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
           })
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
        
        if(userEmail){
            if(email === userEmail.email){
                const passOk= bcrypt.compareSync(password,userEmail.password)
            if(passOk){
                jwt.sign({email:userEmail.email,id:userEmail._id},jwtSecret,{},(err :Error , token: string )=> {
                    if(err){
                        throw err
                    }
                    
                    res.cookie("token",token,{
                        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
                        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
                        sameSite: 'strict', // Required for cross-site cookies, adjust based on your setup
                      
                    } ).status(200).json({email:userEmail.email,id:userEmail._id})
                })
            } else{
                res.status(401).json({msg:"Incorrect password"})
            }
        }else{
            res.status(404).json({msg:"User wasnt found"})
        }
        } else {
            res.status(404).json({msg:"User credential couldnt verified"})
        }
        
    }catch(err){
        res.status(404).json({msg:"error getting user"})
    }
}
const updateProfile= async (req: Request, res: Response) => {
    try {
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
       const {token}=  req.cookies
        const data= req.body
        
        if (!token) {
            return res.status(401).json({ msg: "No token provided" }); // Use 401 for unauthorized
        }

        jwt.verify(token, jwtSecret, async(err: Error | null, user: any) => {
            if (err || !user) {
                return res.status(401).json({ msg: "Invalid token", error: err?.message });
            }
            
           const Duser=await  NUser.findById(user.id)
           if(Duser.email === user.email){
            Duser.set(data)
            await Duser.save()
            res.status(200).json(Duser)
           }
        });
    } catch (err) {
        console.error("Error getting user profile:", err);
        return res.status(500).json({ msg: "Error getting user profile" });
    }
};




module.exports= {
    createUser,
    updateProfile,
    loggin,
}