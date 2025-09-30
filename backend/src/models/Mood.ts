import { Schema, model } from "mongoose";

const moodSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: String, required: true }, // e.g., "happy", "sad", "anxious"
  note: { type: String },
  date: { type: Date, default: Date.now },
});

const Mood = model("Mood", moodSchema);

export default Mood;
