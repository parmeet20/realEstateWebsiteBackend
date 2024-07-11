import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGOOSE_URI || "")
    .then(() => console.log("CONNECTED TO DB SUCCESSFULLY"));
};
