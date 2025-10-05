import type { Request, Response } from "express";
import { MongoConnection } from "../../datasource/mongoConnection.ts";
import { UserDatasource } from "../../datasource/userDatasource.ts";
import { config } from "../../models/types.ts";

const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const mongo = new MongoConnection(config.mongoConnectionUrl);
    const userDatasource = new UserDatasource(mongo);

    const result = await userDatasource.register({
      userEmail: email,
      userName: username,
      password,
    });

    if (!result) {
      return res.status(409).json({ error: "User already exists" });
    }

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

export default register;
