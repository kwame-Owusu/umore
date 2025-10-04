import type { Request, Response } from "express";
import User from "../../models/User.ts";
import Mood from "../../models/Mood.ts";
import dotenv from "dotenv";
dotenv.config();

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    // Delete user's moods first
    await Mood.deleteMany({ userId });

    // Then delete user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User and all associated data deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: `Server Error, ${err}` });
  }
};

export default deleteUser;
