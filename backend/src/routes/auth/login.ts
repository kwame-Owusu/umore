import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User.ts";
import dotenv from "dotenv";
dotenv.config();

const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export default login;
