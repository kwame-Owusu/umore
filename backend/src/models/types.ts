import * as dotenv from "dotenv";
dotenv.config();

export type MoodType = "happy" | "sad" | "anxious" | "neutral" | "excited";

export type Config = {
  port: string;
  mongoConnectionUrl: string;
  jwtSecret: string;
  clientUrl: string;
};

export const config: Config = {
  port: process.env.PORT!,
  mongoConnectionUrl: process.env.MONGO_CONNECTION_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  clientUrl: process.env.CLIENT_URL!
};
