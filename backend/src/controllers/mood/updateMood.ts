import type { Request, Response } from "express";
import { Mood } from "../../models/Mood.ts";

const updateMood = async (req: Request, res: Response) => {
  try {
    const { mood, note } = req.body;
    const moodId = req.params.id;
    const updatedMood = await Mood.findByIdAndUpdate(moodId, { mood, note });
    if (!updatedMood) {
      return res.status(404).json({ message: `Mood not found` });
    }
    res.status(200).json({ message: `Mood updated successfully` });
  } catch (err) {
    res.status(500).json({ message: `Error updating mood, ${err}` });
  }
};

export default updateMood;
