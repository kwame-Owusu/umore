import mongoose from "mongoose";
import type { Connection } from "mongoose";
import { MoodSchema } from "../models/Mood.ts";
import { UserSchema } from "../models/User.ts";

export class MongoConnection {
  private databaseConnectionUrl: string;

  constructor(databaseConnectionUrl: string) {
    this.databaseConnectionUrl = databaseConnectionUrl;
  }

  async connect() {
    await mongoose.connect(this.databaseConnectionUrl);
    console.log("[server]: MongoDB Database Connected");
  }

  async close() {
    await mongoose.disconnect();
  }

  async getConnection(databaseId: string): Promise<Connection> {
    return mongoose.connection
      .useDb(databaseId, {
        useCache: true,
      })
      .asPromise();
  }

  async getMoodModel(databaseId = "Mood") {
    const connection = await this.getConnection(databaseId);
    return connection.model("Mood", MoodSchema, "Mood");
  }

  async getUserModel(databaseId = "User") {
    const connection = await this.getConnection(databaseId);
    return connection.model("User", UserSchema, "User");
  }

  generateObjectId(id?: string) {
    return new mongoose.Types.ObjectId(id);
  }
}
