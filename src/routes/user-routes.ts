import { Router } from "express";
import { verifyToken } from "../lib/verifyToken";
import { deleteUser, updateUser } from "../controllers/user-controller";

const router = Router();
router.put("/update/:id", verifyToken, updateUser);
router.delete("/deleteuser/:id", verifyToken, deleteUser);
export default router;
