import axios from "axios";
import type { CreateMoodRequest, MoodDTO, UpdateMoodRequest } from "../types/mood";

const API_URL = "http://localhost:3000/api/";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const authAPI = {
    register: (email: string, password: string, username: string) =>
        api.post("auth/register", { email, password, username }),

    login: (email: string, password: string) =>
        api.post("auth/login", { email, password }),

    deleteUser: () =>
        api.delete("auth/user"),
};

export const moodAPI = {
    create: (mood: CreateMoodRequest) =>
        api.post<MoodDTO>("moods", mood),

    getAll: () =>
        api.get<MoodDTO[]>("moods"),

    getById: (id: string) =>
        api.get<MoodDTO>(`moods/${id}`),

    update: (id: string, mood: UpdateMoodRequest) =>
        api.put<MoodDTO>(`moods/${id}`, mood),

    delete: (id: string) =>
        api.delete<void>(`moods/${id}`),
};


// fetch quotes
export const quotesAPI = {
    getDailyQuote: () => api.get("quotes/daily"),
};


export default api;