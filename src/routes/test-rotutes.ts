import { Router } from "express";
import { verifyToken } from "../lib/verifyToken";
import {
  shouldBeAdmin,
  shouldBeLoggedIn,
} from "../controllers/test-controller";

const router = Router();
router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);
router.get("/should-be-admin", shouldBeAdmin);
export default router;
