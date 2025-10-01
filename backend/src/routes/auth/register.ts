import { Request, Response } from "express";
import User from "../../models/User.ts";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    email: req.body.email,
    password: hashedPassword,
  });
  res.json({
    message: "User created",
    userEmail: user.email,
    userPwd: user.password,
  });
};

export default register;
