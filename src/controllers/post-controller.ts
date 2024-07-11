import { Request, Response } from "express";
import Post from "../models/post-model";
import { IPost } from "../types/modelTypes/modelTypes";
import User from "../models/user-model";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).populate("userId");
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const addPost = async (req: Request, res: Response) => {
  // @ts-ignore
  const tokenId = req.userId;
  try {
    const newPost = new Post<IPost>({
      ...req.body,
      userId: tokenId,
    });
    await User.findByIdAndUpdate(tokenId, {
      $push: { posts: newPost._id },
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const updatePost = async (req: Request, res: Response) => {};
export const deletePost = async (req: Request, res: Response) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(400).json({ msg: "Error deleting post" });
    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    return res.status(400).json({ msg: "Error deleting post" });
  }
};
