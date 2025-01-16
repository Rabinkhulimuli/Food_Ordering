import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import user from "../model/modelSchema";
import NUser from "../model/modelSchema"
const jwtSecret = process.env.JWT_SECRET as string;
declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = ()=> {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  
}
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  
  if(!authorization || !authorization.startsWith("Bearer")){
    res.status(404).json("token wasnt found")
  }

  // Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
  const token= authorization?.split(" ")[1] as string

  try {
    jwt.verify(token, jwtSecret, async (err: Error | null, user: any) => {
      if (err || !user) {
        return res.status(401).json({ msg: "Invalid token", error: err?.message });
      }

      const Duser = await NUser.findById(user.id);
      if(!Duser){
        res.status(404).json("user not found")
      }
      req.userId=Duser?.id
      next();
    });

   
  } catch (error) {
    return res.sendStatus(401);
  }
};