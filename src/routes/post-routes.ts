import { Router } from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post-controller";
import { verifyToken } from "../lib/verifyToken";

const router = Router();
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/add", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
export default router;
