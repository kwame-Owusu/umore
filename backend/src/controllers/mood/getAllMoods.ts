import type { Request, Response } from "express";
import { Mood } from "../../models/Mood.ts";

const getAllMoods = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date, mood } = req.query;

    // Build query dynamically
    const query: any = { userId };

    if (date) {
      //Mood model stores dates as full Date objects, convert it properly
      const startOfDay = new Date(date as string);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date as string);
      endOfDay.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    if (mood) {
      query.mood = mood;
    }

    const moods = await Mood.find(query);

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
