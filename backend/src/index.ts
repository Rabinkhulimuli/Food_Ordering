const express = require("express");
const cors = require("cors");
const cookieParser=require('cookie-parser')
require("dotenv").config();
const app = express();
const task = require("./router/task");
import connectDB from './db/connectDb'

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}))
app.use(express.json());
app.use("/user", task);
app.use(cookieParser())

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING as string);
    console.log("Database connected successfully");
    app.listen(5000, () => {
      console.log("server started at localhost:5000");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
