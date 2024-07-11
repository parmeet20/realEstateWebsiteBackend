"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.addPost = exports.getPost = exports.getPosts = void 0;
const post_model_1 = __importDefault(require("../models/post-model"));
const user_model_1 = __importDefault(require("../models/user-model"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const post = yield post_model_1.default.findById(id).populate("userId");
        res.status(200).json(post);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getPost = getPost;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const tokenId = req.userId;
    try {
        const newPost = new post_model_1.default(Object.assign(Object.assign({}, req.body), { userId: tokenId }));
        yield user_model_1.default.findByIdAndUpdate(tokenId, {
            $push: { posts: newPost._id },
        });
        const savedPost = yield newPost.save();
        res.status(200).json(savedPost);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addPost = addPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield post_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPost)
            return res.status(400).json({ msg: "Error deleting post" });
        res.status(200).json({ msg: "Post deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ msg: "Error deleting post" });
    }
});
exports.deletePost = deletePost;
