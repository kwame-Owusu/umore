import type { Request, Response } from "express";
import Mood from "../models/Mood";

const createMood = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { mood, note } = req.body;
    const newMood = new Mood({ userId, mood, note });
    const savedMood = await newMood.save();
    res.status(201).json(savedMood);
  } catch (err) {
    res.status(500).json({ message: `Error adding mood to database, ${err}` });
  }
};

export default createMood;
