import type { Request, Response } from "express";
import { MongoConnection } from "../../datasource/mongoConnection.ts";
import { config } from "../../models/types.ts";
import { MoodDatasource } from "../../datasource/moodDatasource.ts";


const createMood = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { mood, note } = req.body;

    if (!userId || !mood) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const mongo = new MongoConnection(config.mongoConnectionUrl);
    const moodDatasource = new MoodDatasource(mongo);

    const savedMood = await moodDatasource.createMood({ userId, mood, note });

    res.status(201).json(savedMood);
  } catch (err) {
    res.status(500).json({ message: `Error adding mood to database, ${err}` });
  }
};

export default createMood;
