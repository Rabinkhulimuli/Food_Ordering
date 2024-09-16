import {Request,Response} from "express";
import Stripe from "stripe";

const STRIPE= new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const createCheckOutSession= async(req:Request,res:Response)=> {
    try{
        const {data}= req.body;
        console.log(data);
    }catch(err:any){
        console.log(err);
        res.status(500).json({message:err.raw.message})
    }
}