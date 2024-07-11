import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  posts: IPost[];
  profilePicture?: string;
}
export interface IPost extends Document {
  title: string;
  price: number;
  property: Property;
  img: string;
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  userId: IUser;
  desc: string;
  utilities?: string;
  petAllowed?: boolean;
  smokingAllowed?: boolean;
  area?: number;
  schoolDistance?: number;
  busDistance?: number;
  restarauntDistance?: number;
}
export enum Property {
  RENT = "RENT",
  LAND = "LAND",
  HOUSE = "HOUSE",
  STUDIO = "STUDIO",
  APARTMENT = "APARTMENT",
}
