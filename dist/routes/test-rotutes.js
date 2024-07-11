"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../lib/verifyToken");
const test_controller_1 = require("../controllers/test-controller");
const router = (0, express_1.Router)();
router.get("/should-be-logged-in", verifyToken_1.verifyToken, test_controller_1.shouldBeLoggedIn);
router.get("/should-be-admin", test_controller_1.shouldBeAdmin);
exports.default = router;
