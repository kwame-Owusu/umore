import express from "express";
import type { Request, Response } from "express";
import authRouter from "./routes/auth/router.ts";
import moodRouter from "./routes/mood/router.ts";
import { config } from "./models/types.ts";
import { MongoConnection } from "./datasource/mongoConnection.ts";
import cors from "cors"

const app = express();
const database = new MongoConnection(config.mongoConnectionUrl)

app.use(express.json());
console.log(config.clientUrl)
app.use(cors({
  origin: config.clientUrl,
}))

app.use("/api/auth", authRouter);
app.use("/api/moods", moodRouter);
app.get("/api/ping", (_: Request, res: Response) => {
  res.send("pong");
});

database.connect().then(() => {
  app.listen(config.port, () => {
    console.log(`[server] running at: http://localhost:${config.port}`);
  });
});
