import { Router } from "express";
import register from "../auth/register.ts";
import login from "../auth/login.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
