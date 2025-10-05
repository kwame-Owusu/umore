import mongoose from "mongoose";
import { config } from "../models/types.ts";

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoConnectionUrl);
    console.log("Mongo DB connected successfully");
  } catch (err) {
    console.log("Error occured connecting to DB: ", err);
    process.exit(1); // exit with failure
  }
}
