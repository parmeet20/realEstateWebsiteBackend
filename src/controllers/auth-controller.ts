import { Request, Response } from "express";
import User from "../models/user-model";
import { IUser } from "../types/modelTypes/modelTypes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const userExists: IUser | null = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (userExists) {
      return res.status(400).json({ msg: "username or email already exists" });
    }
    const hashedPass: string = await bcrypt.hash(password, 10);
    const user: IUser = new User({
      username,
      email,
      password: hashedPass,
    });
    await user.save();
    res.status(200).json({ msg: "user created" });
  } catch (error) {
    res.status(400).json({ msg: "error creating user" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser | null = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "username not found" });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(400).json({ msg: "invalid password" });
    const age: number = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      { id: user._id, isAdmin: true },
      process.env.SECRET_KEY || "",
      {
        expiresIn: age,
      }
    );
    const { password: _, ...userData } = user.toObject();
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userData);
  } catch (error) {
    res.status(400).json({ msg: "error logging in" });
  }
};
export const logout = (req: Request, res: Response) => {
  res.clearCookie("test").status(200).json({ msg: "Logout success" });
};
