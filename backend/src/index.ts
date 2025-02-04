import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
const app = express();
import task from "./router/task"
import myRestaurantRoute from './router/myResturantRoute'
import restaurantDetails from './router/restaurantDetails'
import connectDB from './db/connectDb'
const PORT=process.env.PORT 
import {Request,Response} from 'express'
import{v2 as cloudinary} from 'cloudinary'
import orderRoutes from "./router/orderRoutes"

dotenv.config()

app.use(cors({
  origin: process.env.FRONTEND_API_URL as string, 
  credentials: true, 
}))


app.use("/api/order/checkbox/webhook",express.raw({type:"*/*"}))
app.use(express.json());
app.use(cookieParser())
app.use("/user", task);
app.use('/api/my/restaurant',myRestaurantRoute)
app.use('/api/restaurant',restaurantDetails)
app.use('/api/order',orderRoutes)
app.get('/health',(req:Request,res:Response)=> {
  res.status(200).send({message:"health OK"})
})

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})
const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING as string);
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`server started at localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
