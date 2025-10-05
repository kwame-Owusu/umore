import type { IMood } from "../models/Mood.ts";
import { MongoConnection } from "./mongoConnection.ts"


export class MoodDatasource {
    private database: MongoConnection

    constructor(database: MongoConnection) {
        this.database = database
    }

    async createMood(params: CreateMoodParams): Promise<IMood> {
        const moodModel = await this.database.getMoodModel();
        const { userId, mood, note } = params;
        const newMood = new moodModel({
            userId,
            mood,
            note,
        });
        const savedMood = await newMood.save();

        return savedMood.toObject();
    }

    async getAllMoods(params: GetAllMoodsParams): Promise<IMood[]> {
        const { userId, date, mood } = params;
        if (!userId) {
            throw new Error("User ID is required");
        }

        const moodModel = await this.database.getMoodModel();

        // Build query dynamically
        const query: any = { userId };

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query.date = { $gte: startOfDay, $lte: endOfDay };
        }
        if (mood) {
            query.mood = mood;
        }

        const moods = await moodModel.find(query);
        // Convert each document to plain object
        return moods.map((m) => m.toObject());
    }

    async getMoodById(moodId: string): Promise<IMood | null> {
        if (!moodId) throw new Error("Mood ID is required");

        const moodModel = await this.database.getMoodModel();
        const mood = await moodModel.findById(moodId);

        if (!mood) return null;

        return mood.toObject();
    }


    async updateMood(moodId: string, params: UpdateMoodParams): Promise<IMood | null> {
        if (!moodId) throw new Error("Mood ID is required");

        const moodModel = await this.database.getMoodModel();

        const updatedMood = await moodModel.findByIdAndUpdate(
            moodId,
            { ...params },
            { new: true } // return the updated document
        );

        if (!updatedMood) return null;

        return updatedMood.toObject();
    }

    async deleteMood(moodId: string): Promise<boolean> {
        if (!moodId) throw new Error("Mood ID is required");

        const moodModel = await this.database.getMoodModel();
        const deleted = await moodModel.findByIdAndDelete(moodId);

        return deleted ? true : false;
    }



}

interface CreateMoodParams {
    userId: string;
    mood: string;
    note?: string;
}

interface GetAllMoodsParams {
    userId: string;
    date?: string; // ISO date string
    mood?: string;
}

interface UpdateMoodParams {
    mood?: string;
    note?: string;
}
