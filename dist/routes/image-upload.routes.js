"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinaryUpload_1 = __importDefault(require("../lib/cloudinaryUpload"));
const router = (0, express_1.Router)();
router.post("/upload", (req, res) => {
    const { url } = req.body;
    try {
        const upload = cloudinaryUpload_1.default.uploader.upload(url).then((result) => {
            res.status(200).json({ msg: result.secure_url });
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.default = router;
