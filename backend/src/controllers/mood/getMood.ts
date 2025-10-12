import type { Request, Response } from "express";
import { MongoConnection } from "../../datasource/mongoConnection.ts";
import { MoodDatasource } from "../../datasource/moodDatasource.ts";
import { config } from "../../models/types.ts";
import { database } from "../../datasource/db.ts";


const getMood = async (req: Request, res: Response) => {
  try {
    const moodId = req.params.id;
    if (!moodId) {
      return res.status(400).json({ message: "Mood ID is required" });
    }

    const moodDatasource = new MoodDatasource(database);
    const mood = await moodDatasource.getMoodById(moodId);

    if (!mood) {
      return res.status(404).json({ message: "Mood entry not found" });
    }

    res.status(200).json(mood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error getting mood entry, ${err}` });
  }
};
export default getMood;
