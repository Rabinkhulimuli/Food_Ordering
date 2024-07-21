const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const task = require("./router/task");
import connectDB from './db/connectDb'

app.use(cors());
app.use(express.json());
app.use("/user", task);

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
