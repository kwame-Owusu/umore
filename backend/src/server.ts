import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import { connectDB } from "./config/db.ts";
import authRouter from "./routes/auth/router.ts";
import moodRouter from "./routes/mood/router.ts";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/moods", moodRouter);
app.get("/ping", (_: Request, res: Response) => {
  res.send("pong");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});
