import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Restaurant from "../model/resturant";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;


const uploadImage=async (file:Express.Multer.File)=> {
  const image=file
  const base64Image=Buffer.from(image.buffer).toString("base64")
  const dataURI = `data:${image.mimetype};base64,${base64Image}`
  const uploadResponse=await cloudinary.v2.uploader.upload(dataURI)
  return uploadResponse.url
}
const createResturant = async (req: Request, res: Response) => {
  try {
    const {authorization}= req.headers
    if (!authorization || !authorization.startsWith("Bearer")){
      return res.status(404).send("there is no token");
    }
    const token=authorization?.split(" ")[1]
    jwt.verify(token, jwtSecret, async (err: Error | null, user: any) => {
      if (err || !user) {
        return res
          .status(401)
          .json({ msg: "Invalid token", error: err?.message });
      }
      const existingRestaurant = await Restaurant.findOne({ user: user.id });
      if (existingRestaurant) {
        return res.status(409).json({ msg: "User Restaurant already exists" });
      }
      const image = req.file as Express.Multer.File;
      const base64Image = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64Image}`;
      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
      const restaurant = new Restaurant(req.body);
      restaurant.imageUrl = uploadResponse.url;
      restaurant.user = user.id;
      restaurant.lastUpdated = new Date();
      await restaurant.save();

      res.status(201).json(restaurant);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating Restaurant" });
  }
};
const getRestaurant =(req:Request,res:Response)=> {
  try{
    const {authorization}= req.headers
    if(!authorization || !authorization.startsWith("Bearer")){
      res.status(404).json("token wasnt found")
    }
    const token= authorization?.split(" ")[1] as string
   
    jwt.verify(token,jwtSecret,async(err:Error | null,user:any)=> {
      if(err){
        res.status(404).json("error occoured")
      }
      const restaurant= await Restaurant.findOne({user:user.id})
      
      res.status(200).json(restaurant)
    })
  }catch(err){
    res.status(404).json({msg:err})
  }
}

const updateRestaurant= async(req:Request,res:Response)=> {
  try{
    const {authorization}= req.headers
    if(!authorization || !authorization.startsWith("Bearer ")){
      res.status(404).json("token not found")
    }
    const token= authorization?.split(" ")[1] as string
    jwt.verify(token,jwtSecret,async(err:Error | null,user:any)=> {
      if (err){
        throw err
      }
      const restaurant= await Restaurant.findOne({user:user.id})
      if(!restaurant){
        return res.status(401).json("couldnt find restaurant user ")
      }
      restaurant.restaurantName=req.body.restaurantName
      restaurant.city=req.body.city
      restaurant.country=req.body.country
      restaurant.deliveryPrice=req.body.deliveryPrice
      restaurant.estimatedDeliveryTime=req.body.estimatedDeliveryTime
      restaurant.cuisines=req.body.cuisines
      restaurant.menuItems=req.body.menuItems
      restaurant.lastUpdated=new Date()
      if (req.file){
        const imageUrl= await uploadImage(req.file as Express.Multer.File)
        restaurant.imageUrl=imageUrl 
      }
      await restaurant.save()
      res.status(200).json(restaurant)
    })
  }catch(err){
    console.log(err)
    res.status(500).json("error updating restaurant")
  }
}
export { createResturant,getRestaurant ,updateRestaurant};
