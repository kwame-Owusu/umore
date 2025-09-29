import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL!);
    console.log("Mongo DB connected successfully");
  } catch (err) {
    console.log("Error occured connecting to DB: ", err);
    process.exit(1); // exit with failure
  }
}
