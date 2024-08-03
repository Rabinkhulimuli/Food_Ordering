import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Restaurant from "../model/resturant";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;

const createResturant = async (req: Request, res: Response) => {
  try {
    const { token } = await req.cookies;
    if (!token) {
      return res.status(404).send("there is no token");
    }
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
export { createResturant };
