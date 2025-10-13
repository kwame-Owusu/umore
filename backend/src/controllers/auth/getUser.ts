import type { Request, Response } from "express";
import { User } from "../../models/User.ts";

const getUser = async (req: Request, res: Response) => {
  try {
    // req.user is set by authMiddleware
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId).select("username");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ username: user.username });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export default getUser;