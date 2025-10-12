import type { Request, Response } from "express";
import { MoodDatasource } from "../../datasource/moodDatasource.ts";
import { database } from "../../datasource/db.ts";

const getAllMoods = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date, mood } = req.query;

    const moodDatasource = new MoodDatasource(database);
    const moods = await moodDatasource.getAllMoods({
      userId,
      date: date as string,
      mood: mood as string,
    });

    if (!moods.length) {
      return res.status(204).json([]);
    }

    res.status(200).json(moods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error fetching moods: ${err}` });
  }
};

export default getAllMoods;
