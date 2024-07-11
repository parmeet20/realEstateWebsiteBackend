import mongoose, { Schema, model } from "mongoose";
import { IPost, Property } from "../types/modelTypes/modelTypes";

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, min: 2, max: 100 },
    price: { type: Number, required: true },
    property: { type: String, enum: Object.values(Property) },
    img: [{ type: String, required: true ,default:"siadojf;a"}],
    address: { type: String, required: true, min: 2, max: 100 },
    city: { type: String, required: true, min: 2, max: 100 },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    latitude: { type: String, required: true, min: 2, max: 100 },
    longitude: { type: String, required: true, min: 2, max: 100 },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    desc: { type: String, required: true },
    utilities: { type: String, required: true },
    petAllowed: { type: Boolean, required: true },
    smokingAllowed: { type: Boolean, required: true },
    schoolDistance: { type: Number, required: true },
    busDistance: { type: Number, required: true },
    area: { type: Number, required: true },
  },
  { timestamps: true }
);
const Post = model<IPost>("Post", postSchema);
export default Post;
