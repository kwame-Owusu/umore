import { Router } from "express";
import createMood from "../../controllers/mood/createMood.ts";
import authMiddleware from "../../middleware/authMiddleware.ts";
import getAllMoods from "../../controllers/mood/getAllMoods.ts";
import getMood from "../../controllers/mood/getMood.ts";

const router = Router();

router.use(authMiddleware);
router.post("/", createMood);
router.get("/", getAllMoods);
router.get("/:id", getMood);

export default router;
