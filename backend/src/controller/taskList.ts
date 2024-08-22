import { Request, Response } from "express";
import NUser from '../model/modelSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET as string;

if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await NUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({msg:"User with this email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const newUser = await NUser.create({ email, password: hashedPassword });

    res.status(201).json(newUser.email);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ msg: "Error creating user" });
  }
};

const loggin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await NUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token= jwt.sign({email:user.email,id:user._id},jwtSecret)

      res.status(200).json({ email: user.email, id: user._id,token: token });
    ;
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ msg: "Error logging in" });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const {authorization}= req.headers

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }
    const token = authorization.split(" ")[1]

    jwt.verify(token, jwtSecret, async (err: Error | null, user: any) => {
      if (err || !user) {
        return res.status(401).json({ msg: "Invalid token", error: err?.message });
      }

      const Duser = await NUser.findById(user.id);
      if (Duser && Duser.email === user.email) {
        Duser.set(data);
        await Duser.save();
        res.status(200).json(Duser);
      } else {
        res.status(401).json({ msg: "Unauthorized to update this profile" });
      }
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ msg: "Error updating profile" });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
  
    const {authorization}= req.headers

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }
    const token = authorization.split(" ")[1]
    jwt.verify(token, jwtSecret, async (err: Error | null, user: any) => {
      if (err || !user) {
        return res.status(401).json({ msg: "Invalid token", error: err?.message });
      }

      const Duser = await NUser.findById(user.id);
      if (!Duser) {
        return res.status(404).json({ msg: "User not found" });
      }

      return res.status(200).json({
        id:Duser._id,
        name: Duser?.name,
        email: Duser.email,
        city: Duser?.city,
        country:Duser?.country,
        addressLine1: Duser?.addressLine1,
        contact: Duser?.contact,
      });
    });
  } catch (err) {
    console.error("Error getting user profile:", err);
    return res.status(500).json({ msg: "Error getting user profile" });
  }
};

const logOut = (req: Request, res: Response) => {
  return res.status(200)
    .send();
};

export {
  createUser,
  updateProfile,
  loggin,
  getProfile,
  logOut,
};
