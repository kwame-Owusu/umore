import { Router } from "express";
import createMood from "../../controllers/mood/createMood.ts";
import authMiddleware from "../../middleware/authMiddleware.ts";
import getAllMoods from "../../controllers/mood/getAllMoods.ts";
import getMood from "../../controllers/mood/getMood.ts";
import updateMood from "../../controllers/mood/updateMood.ts";
import deleteMood from "../../controllers/mood/deleteMood.ts";

const router = Router();

router.use(authMiddleware);
router.post("/", createMood);
router.get("/", getAllMoods);
router.get("/:id", getMood);
router.put("/:id", updateMood);
router.delete("/:id", deleteMood);

export default router;
