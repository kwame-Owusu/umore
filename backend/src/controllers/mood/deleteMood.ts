import type { Request, Response } from "express";
import { MoodDatasource } from "../../datasource/moodDatasource.ts";
import { database } from "../../datasource/db.ts";

const deleteMood = async (req: Request, res: Response) => {
  try {
    const moodId = req.params.id;
    if (!moodId) {
      return res.status(400).json({ message: "Mood ID is required" });
    }

    const moodDatasource = new MoodDatasource(database);
    const deleted = await moodDatasource.deleteMood(moodId);

    if (!deleted) {
      return res.status(404).json({ message: "Mood not found" });
    }

    res.status(200).json({ message: "Mood deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error deleting mood, ${err}` });
  }
};

export default deleteMood;
