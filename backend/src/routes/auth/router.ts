import { Router } from "express";
import register from "../../controllers/auth/register.ts";
import login from "../../controllers/auth/login.ts";
import deleteUser from "../../controllers/auth/deleteUser.ts";
import getUser from "../../controllers/auth/getUser.ts";
import authMiddleware from "../../middleware/authMiddleware.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, getUser);
router.delete("/user", authMiddleware, deleteUser);

export default router;
