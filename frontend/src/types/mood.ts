export type MoodType = "happy" | "sad" | "angry" | "neutral" | "excited";

// DTO (Data Transfer Object) - what the API sends/receives
export interface MoodDTO {
    _id: string;
    userId: string;
    mood: MoodType;
    note?: string;
    date: string; // ISO date string from API
}

export interface CreateMoodRequest {
    mood: MoodType;
    note?: string;
}

export interface UpdateMoodRequest {
    mood?: MoodType;
    note?: string;
}

export const moodLabels: Record<MoodType, string> = {
    happy: "Happy",
    sad: "Sad",
    angry: "Angry",
    neutral: "Neutral",
    excited: "Excited",
};