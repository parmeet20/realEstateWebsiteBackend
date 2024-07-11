"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const user_controller_1 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
router.put("/update/:id", verifyToken_1.verifyToken, user_controller_1.updateUser);
router.delete("/deleteuser/:id", verifyToken_1.verifyToken, user_controller_1.deleteUser);
exports.default = router;
