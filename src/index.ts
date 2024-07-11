import express from "express";
import dotenv from "dotenv";
import CookieParser from "cookie-parser";
import { connectDB } from "./config/dbConnect";
import cors from "cors";
import authRoutes from "./routes/auth-routes";
import testRoutes from "./routes/test-rotutes";
import userRoutes from "./routes/user-routes";
import uploadImageRoutes from "./routes/image-upload.routes";
import postRoutes from "./routes/post-routes";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(CookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/test", testRoutes);
app.use("/api/user", userRoutes);
app.use("/api",uploadImageRoutes)
const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`APP LISTENING AT PORT ${PORT}`));
});
