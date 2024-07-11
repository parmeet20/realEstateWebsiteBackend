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
exports.logout = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const userExists = yield user_model_1.default.findOne({
            $or: [{ username }, { email }],
        });
        if (userExists) {
            return res.status(400).json({ msg: "username or email already exists" });
        }
        const hashedPass = yield bcryptjs_1.default.hash(password, 10);
        const user = new user_model_1.default({
            username,
            email,
            password: hashedPass,
        });
        yield user.save();
        res.status(200).json({ msg: "user created" });
    }
    catch (error) {
        res.status(400).json({ msg: "error creating user" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ username });
        if (!user)
            return res.status(400).json({ msg: "username not found" });
        const comparePassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!comparePassword)
            return res.status(400).json({ msg: "invalid password" });
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: true }, process.env.SECRET_KEY || "", {
            expiresIn: age,
        });
        const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        res
            .cookie("token", token, {
            httpOnly: true,
            maxAge: age,
        })
            .status(200)
            .json(userData);
    }
    catch (error) {
        res.status(400).json({ msg: "error logging in" });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("test").status(200).json({ msg: "Logout success" });
};
exports.logout = logout;
