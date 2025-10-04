import type { Request, Response } from "express";
import Mood from "../../models/Mood.ts";

const getAllMoods = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const moods = await Mood.find({ userId });
    if (!moods) {
      return res.status(204).json({ message: "No moods found" });
    }
    res.status(200).json({ data: moods });
  } catch (err) {
    res.status(500).json({ message: `Error adding mood to database, ${err}` });
  }
};

export default getAllMoods;
