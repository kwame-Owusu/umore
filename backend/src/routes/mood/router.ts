import { Router } from "express";
import createMood from "../../controllers/mood/createMood.ts";
import authMiddleware from "../../middleware/authMiddleware.ts";

const router = Router();

router.use(authMiddleware);
router.post("/", createMood);

export default router;
