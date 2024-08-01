const express = require("express");
const cors = require("cors");
const cookieParser=require('cookie-parser')
require("dotenv").config();
const app = express();
const task = require("./router/task");
import connectDB from './db/connectDb'
const PORT=process.env.PORT 
import {Request,Response} from 'express'
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}))
app.use(cookieParser())
app.use(express.json());

app.use("/user", task);
app.get('/health',(req:Request,res:Response)=> {
  res.status(200).send({message:"health OK"})
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
