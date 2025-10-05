import type { Request, Response } from "express";
import { Mood } from "../../models/Mood.ts";


const getMood = async (req: Request, res: Response) => {
  try {
    const moodId = req.params.id;
    const mood = await Mood.findById(moodId);
    if (!mood) {
      return res.status(204).json({ message: "Mood entry not found" });
    }
    res.status(200).json({ data: mood });
  } catch (err) {
    res.status(500).json({ message: `Error getting mood entry, ${err}` });
  }
};

export default getMood;
