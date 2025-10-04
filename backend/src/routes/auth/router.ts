import { Router } from "express";
import register from "../auth/register.ts";
import login from "../auth/login.ts";
import deleteUser from "./deleteUser.ts";
import authMiddleware from "../../middleware/authMiddleware.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/user", authMiddleware, deleteUser);

export default router;
