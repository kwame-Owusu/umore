import express from "express";
import type { Request, Response } from "express";
import { connectDB } from "./config/db.ts";
import authRouter from "./routes/auth/router.ts";
import moodRouter from "./routes/mood/router.ts";
import { config } from "./models/types.ts";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/moods", moodRouter);
app.get("/ping", (_: Request, res: Response) => {
  res.send("pong");
});

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running at: http://localhost:${config.port}`);
  });
});
