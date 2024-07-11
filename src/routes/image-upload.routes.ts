import { Request, Response, Router } from "express";
import cloudinary from "../lib/cloudinaryUpload";

const router = Router();
router.post("/upload", (req: Request, res: Response) => {
  const { url } = req.body;
  try {
    const upload = cloudinary.uploader.upload(url).then((result) => {
      res.status(200).json({ msg: result.secure_url });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
export default router;
