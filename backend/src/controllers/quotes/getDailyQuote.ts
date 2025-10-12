import type { Request, Response } from "express";

// Cache for daily quote
let dailyQuoteCache: any = null;
let cacheDate: string = "";

const getDailyQuote = async (_: Request, res: Response) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

        // Return cached quote if it's still today's quote
        if (dailyQuoteCache && cacheDate === today) {
            return res.json(dailyQuoteCache);
        }

        // Fetch new daily quote
        const response = await fetch("https://zenquotes.io/api/today");

        if (!response.ok) {
            throw new Error("Failed to fetch daily quote");
        }

        const data = await response.json();

        // Update cache
        dailyQuoteCache = data;
        cacheDate = today;

        res.json(data);
    } catch (error) {
        console.error("Error fetching daily quote:", error);
        res.status(500).json({ error: "Failed to fetch daily quote" });
    }
};

export default getDailyQuote