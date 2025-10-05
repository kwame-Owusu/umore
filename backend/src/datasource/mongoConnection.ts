import mongoose from "mongoose";
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

  async getMoodModel() {
    return mongoose.model("Mood", MoodSchema, "moods");
  }

  async getUserModel() {
    return mongoose.model("User", UserSchema, "users");
  }

  generateObjectId(id?: string) {
    return new mongoose.Types.ObjectId(id);
  }
}
