import type { Request, Response } from "express";
import { UserDatasource } from "../../datasource/userDatasource.ts";
import { database } from "../../datasource/db.ts";


const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const userDatasource = new UserDatasource(database);

    const result = await userDatasource.login(email, password);

    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({
      message: "Login successful",
      ...result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error during login" });
  }
};

export default login;
