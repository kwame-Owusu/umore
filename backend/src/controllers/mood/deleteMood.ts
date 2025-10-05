import type { Request, Response } from "express";
import { Mood } from "../../models/Mood.ts";

const deleteMood = async (req: Request, res: Response) => {
  try {
    const moodId = req.params.id;
    const deleteMood = await Mood.findByIdAndDelete(moodId);
    if (!deleteMood) {
      return res.status(404).json({ message: `Mood not found` });
    }
    res.status(200).json({ message: `Mood deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting mood, ${err}` });
  }
};

export default deleteMood;
