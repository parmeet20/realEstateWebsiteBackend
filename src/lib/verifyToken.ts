import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "invalid token" });
  //@ts-ignore
  jwt.verify(token, process.env.SECRET_KEY || "", async (err, payload) => {
      if (err) return res.status(403).json({ msg: "token not valid" });
      //@ts-ignore
    req.userId = payload.id;
    next();
  });
};
