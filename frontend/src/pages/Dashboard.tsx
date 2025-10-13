import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Smile, Frown, Meh, Zap, Angry } from "lucide-react";
import { useNavigate } from "react-router";
import { moodAPI, quotesAPI } from "../lib/api";
import type { MoodDTO, MoodType } from "../types/mood";
import ZenQuote from "../components/ZenQuote";

const moodLabels: Record<MoodType, string> = {
  happy: "Happy",
  sad: "Sad",
  angry: "Angry",
  neutral: "Neutral",
  excited: "Excited",
};

const moods: {
  label: string;
  icon: React.JSX.Element;
  color: string;
  type: MoodType;
}[] = [
  {
    label: "Happy",
    icon: <Smile className="size-5" />,
    color: "bg-green-20",
    type: "happy",
  },
  {
    label: "Sad",
    icon: <Frown className="size-5" />,
    color: "bg-purple-20",
    type: "sad",
  },
  {
    label: "Angry",
    icon: <Angry className="size-5" />,
    color: "bg-orange-20",
    type: "angry",
  },
  {
    label: "Neutral",
    icon: <Meh className="size-5" />,
    color: "bg-yellow-10",
    type: "neutral",
  },
  {
    label: "Excited",
    icon: <Zap className="size-5" />,
    color: "bg-orange-10",
    type: "excited",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [recentEntries, setRecentEntries] = useState<MoodDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(
    null
  );
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const fetchMoods = async () => {
    try {
      const response = await moodAPI.getAll();
      setRecentEntries(response.data);

      // Calculate weekly count
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
      startOfWeek.setHours(0, 0, 0, 0);
      const weeklyMoods = response.data.filter(
        (mood) => new Date(mood.date) >= startOfWeek
      );
      setWeeklyCount(weeklyMoods.length);
    } catch (error) {
      console.error("Failed to fetch moods:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = recentEntries.filter((entry) => {
    const matchesMood = selectedMood === "all" || entry.mood === selectedMood;
    const entryDate = new Date(entry.date);
    const matchesDate =
      (!dateFrom || entryDate >= new Date(dateFrom)) &&
      (!dateTo || entryDate <= new Date(dateTo));
    return matchesMood && matchesDate;
  });

  useEffect(() => {
    fetchMoods();
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await quotesAPI.getDailyQuote();
        const data = response.data[0];
        setQuote({ quote: data.q, author: data.a });
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      fetchMoods();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      {/* Main container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-10">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here’s a quick look at your recent moods and insights.
          </p>
        </section>

        {/* Daily Quote */}
        {quote && <ZenQuote quote={quote.quote} author={quote.author} />}

        {/* Today's Mood Section */}
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">
            How are you feeling today?
          </h2>
          <div className="flex justify-center flex-wrap gap-4 mt-4">
            {moods.map((mood) => (
              <Button
                key={mood.label}
                variant="ghost"
                className={`rounded-full w-14 h-14 hover:bg-muted transition ${mood.color} cursor-pointer`}
                onClick={() => navigate(`/create-mood?type=${mood.type}`)}
              >
                {mood.icon}
              </Button>
            ))}
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-3">Filter Entries</h3>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[150px]">
              <Label htmlFor="mood-filter" className="mb-1 block">
                Mood
              </Label>
              <select
                id="mood-filter"
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="all">All Moods</option>
                {Object.entries(moodLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <Label htmlFor="date-from" className="mb-1 block">
                From Date
              </Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <Label htmlFor="date-to" className="mb-1 block">
                To Date
              </Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Recent Entries */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Entries</h2>
          <div className="space-y-3">
            {loading ? (
              <p>Loading...</p>
            ) : filteredEntries.length === 0 ? (
              <p>No entries match the current filters.</p>
            ) : (
              filteredEntries.map((entry) => (
                <Card
                  key={entry._id}
                  onClick={() => navigate(`/mood/${entry._id}`)}
                  className="hover:shadow-md transition-all cursor-pointer"
                >
                  <CardContent className="flex justify-between items-center p-4">
                    <div>
                      <h3 className="font-medium">{moodLabels[entry.mood]}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                      {entry.note || "No note"}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Insights */}
        <Card className="p-6 text-center">
          <h2 className="font-semibold mb-2">Weekly Insight</h2>
          <p className="text-sm text-muted-foreground">
            You logged{" "}
            <strong>
              {weeklyCount} mood{weeklyCount !== 1 ? "s" : ""}
            </strong>{" "}
            this week. Keep up your reflection habit 🌞
          </p>
        </Card>
      </main>
    </div>
  );
}
export default Dashboard;
