import mongoose, { Connection, ConnectOptions } from "mongoose";
import { MoodSchema } from "../models/Mood";

export class MongoConnection {
  private databaseConnectionUrl: string;

  constructor(databaseConnectionUrl: string) {
    this.databaseConnectionUrl = databaseConnectionUrl;
  }

  async connect() {
    await mongoose.connect(this.databaseConnectionUrl);
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
    return connection.model("Mood", MoodSchema, "Mood");
  }

  generateObjectId(id?: string) {
    return new mongoose.Types.ObjectId(id);
  }
}
