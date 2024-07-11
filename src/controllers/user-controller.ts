import { Request, Response } from "express";
import User from "../models/user-model";
import bcrypt from "bcryptjs";
import Post from "../models/post-model";
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userUpdatedDetails = req.body;

  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ msg: "No user exists" });
    }

    if (userUpdatedDetails.password) {
      userUpdatedDetails.password = await bcrypt.hash(
        userUpdatedDetails.password,
        10
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      userUpdatedDetails,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ msg: "Error updating user" });
    }

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    return res.status(200).json({ userWithoutPassword });
  } catch (error) {
    return res.status(500).json({ msg: "Error updating user" });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ msg: "No user exists" });
    }
    await Post.deleteMany({ userId: userId });
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(400).json({ msg: "Error deleting user" });
    }

    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Error deleting user" });
  }
};
