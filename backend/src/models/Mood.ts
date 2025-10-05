import { Schema, model, Document } from "mongoose";
import type { MoodType } from "./types.ts";

// Interface for the mood document
interface IMood extends Document {
  userId: Schema.Types.ObjectId;
  mood: MoodType;
  note?: string;
  date: Date;
}

export const MoodSchema = new Schema<IMood>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: String, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now },
});

export const Mood = model<IMood>("Mood", MoodSchema);
