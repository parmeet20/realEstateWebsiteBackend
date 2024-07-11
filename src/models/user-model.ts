import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../types/modelTypes/modelTypes";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    posts:[{type:mongoose.Schema.ObjectId,ref:"posts"}],
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);
const User = model<IUser>("User", userSchema);
export default User;
