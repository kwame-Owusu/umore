import type { Request, Response } from "express";
import { MongoConnection } from "../../datasource/mongoConnection.ts";
import { MoodDatasource } from "../../datasource/moodDatasource.ts";
import { config } from "../../models/types.ts";

const getAllMoods = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date, mood } = req.query;

    const mongo = new MongoConnection(config.mongoConnectionUrl);
    const moodDatasource = new MoodDatasource(mongo);
    const moods = await moodDatasource.getAllMoods({
      userId,
      date: date as string,
      mood: mood as string,
    });

    if (!moods.length) {
      return res.status(204).json({ message: "No moods found" });
    }

    res.status(200).json({ data: moods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Error fetching moods: ${err}` });
  }
};

export default getAllMoods;
