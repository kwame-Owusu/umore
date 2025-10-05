import type { Request, Response } from "express";
import { MongoConnection } from "../../datasource/mongoConnection.ts";
import { UserDatasource } from "../../datasource/userDatasource.ts";
import { config } from "../../models/types.ts";

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const mongo = new MongoConnection(config.mongoConnectionUrl);
    const userDatasource = new UserDatasource(mongo);

    const deleted = await userDatasource.deleteUser(userId);

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User and all associated data deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Server Error, ${err}` });
  }
};

export default deleteUser;
