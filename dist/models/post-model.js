"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const modelTypes_1 = require("../types/modelTypes/modelTypes");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true, min: 2, max: 100 },
    price: { type: Number, required: true },
    property: { type: String, enum: Object.values(modelTypes_1.Property) },
    img: [{ type: String, required: true, default: "siadojf;a" }],
    address: { type: String, required: true, min: 2, max: 100 },
    city: { type: String, required: true, min: 2, max: 100 },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    latitude: { type: String, required: true, min: 2, max: 100 },
    longitude: { type: String, required: true, min: 2, max: 100 },
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: "User" },
    desc: { type: String, required: true },
    utilities: { type: String, required: true },
    petAllowed: { type: Boolean, required: true },
    smokingAllowed: { type: Boolean, required: true },
    schoolDistance: { type: Number, required: true },
    busDistance: { type: Number, required: true },
    area: { type: Number, required: true },
}, { timestamps: true });
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
