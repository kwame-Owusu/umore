import type { Request, Response } from "express";
import { MongoConnection } from "../../datasource/mongoConnection.ts";
import { MoodDatasource } from "../../datasource/moodDatasource.ts";
import { config } from "../../models/types.ts";

const updateMood = async (req: Request, res: Response) => {
  try {
    const moodId = req.params.id;
    const { mood, note } = req.body;
    if (!moodId) {
      return res.status(400).json({ message: "Mood ID is required" });
    }

    const mongo = new MongoConnection(config.mongoConnectionUrl);
    const moodDatasource = new MoodDatasource(mongo);
    const updatedMood = await moodDatasource.updateMood(moodId, { mood, note });

    if (!updatedMood) {
      return res.status(404).json({ message: "Mood not found" });
    }

    res.status(200).json({
      message: "Mood updated successfully",
      data: updatedMood,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error updating mood, ${err}` });
  }
};

export default updateMood;
