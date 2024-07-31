import { Request, Response } from 'express';
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
            return res.status(409).json({ msg: "User with this email already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const user = await NUser.create({ email, password: hashedPassword });

        return res.status(201).json(user);
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ msg: "Error creating user" });
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

        jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
            if (err) {
                throw err;
            }

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            return res.status(200).json({ email: user.email, id: user._id });
        });
    } catch (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ msg: "Error logging in" });
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
            return res.status(401).json({ msg: "No token provided" });
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

export { createUser, loggin, getProfile };

module.exports= {
    createUser,
    updateProfile,
    loggin,
}