import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const shouldBeLoggedIn = async (res: Response) => {
  res.status(200).json({ msg: "You are authenticated" });
};
export const shouldBeAdmin = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "not authenticated" });
  //@ts-ignore
  jwt.verify(token, process.env.SECRET_KEY || "", (err, payload) => {
    if (err) return res.status(403).json({ msg: "invalid token" });
    if (!payload.isAdmin)
      return res.status(403).json({ msg: "not authorized" });
  });
  res.status(200).json({ msg: "You are authenticated" });
};
