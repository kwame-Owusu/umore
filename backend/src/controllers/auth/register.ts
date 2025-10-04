import type { Request, Response } from "express";
import User from "../../models/User.ts";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    res.json({
      message: "User created",
      userEmail: user.email,
      userName: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export default register;
