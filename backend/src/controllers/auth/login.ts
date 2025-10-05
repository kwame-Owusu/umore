import type { Request, Response } from "express";
import { config } from "../../models/types.ts";
import { MongoConnection } from "../../datasource/mongoConnection.ts";
import { UserDatasource } from "../../datasource/userDatasource.ts";


const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const mongo = new MongoConnection(config.mongoConnectionUrl);
    const userDatasource = new UserDatasource(mongo);

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
