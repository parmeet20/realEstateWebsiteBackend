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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const post_model_1 = __importDefault(require("../models/post-model"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const userUpdatedDetails = req.body;
    try {
        const userExists = yield user_model_1.default.findById(userId);
        if (!userExists) {
            return res.status(404).json({ msg: "No user exists" });
        }
        if (userUpdatedDetails.password) {
            userUpdatedDetails.password = yield bcryptjs_1.default.hash(userUpdatedDetails.password, 10);
        }
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, userUpdatedDetails, { new: true });
        if (!updatedUser) {
            return res.status(400).json({ msg: "Error updating user" });
        }
        const _a = updatedUser.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
        return res.status(200).json({ userWithoutPassword });
    }
    catch (error) {
        return res.status(500).json({ msg: "Error updating user" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const userExists = yield user_model_1.default.findById(userId);
        if (!userExists) {
            return res.status(404).json({ msg: "No user exists" });
        }
        yield post_model_1.default.deleteMany({ userId: userId });
        const deleteUser = yield user_model_1.default.findByIdAndDelete(userId);
        if (!deleteUser) {
            return res.status(400).json({ msg: "Error deleting user" });
        }
        return res.status(200).json({ msg: "User deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ msg: "Error deleting user" });
    }
});
exports.deleteUser = deleteUser;
