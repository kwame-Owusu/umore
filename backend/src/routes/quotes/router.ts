import { Router } from "express";
import getDailyQuote from "../../controllers/quotes/getDailyQuote.ts";

const router = Router();

router.get("/daily", getDailyQuote)
export default router