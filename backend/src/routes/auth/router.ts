import { Router } from "express";
import register from "../auth/register.ts";
import login from "../auth/login.ts";

const router = Router({ mergeParams: true });

router.post("/api/register", register);
router.post("/api/login", login);
