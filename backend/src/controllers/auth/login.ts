import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User.ts";
import { config } from "../../models/types.ts";

const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign({ id: user._id }, config.jwtSecret);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export default login;
