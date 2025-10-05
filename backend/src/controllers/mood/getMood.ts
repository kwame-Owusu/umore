import type { Request, Response } from "express";
import { MongoConnection } from "../../datasource/mongoConnection.ts";
import { MoodDatasource } from "../../datasource/moodDatasource.ts";
import { config } from "../../models/types.ts";


const getMood = async (req: Request, res: Response) => {
  try {
    const moodId = req.params.id;
    if (!moodId) {
      return res.status(400).json({ message: "Mood ID is required" });
    }

    const mongo = new MongoConnection(config.mongoConnectionUrl);
    const moodDatasource = new MoodDatasource(mongo);
    const mood = await moodDatasource.getMoodById(moodId);

    if (!mood) {
      return res.status(204).json({ message: "Mood entry not found" });
    }

    res.status(200).json({ data: mood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error getting mood entry, ${err}` });
  }
};
export default getMood;
