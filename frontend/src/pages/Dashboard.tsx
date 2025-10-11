import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Smile, Frown, Meh, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import { moodAPI } from "../lib/api";
import type { MoodDTO, MoodType } from "../types/mood";

const moodLabels: Record<MoodType, string> = {
  happy: "Happy",
  sad: "Sad",
  anxious: "Anxious",
  neutral: "Neutral",
  excited: "Excited",
};

const moods: { label: string; icon: React.JSX.Element; color: string; type: MoodType }[] = [
  { label: "Happy", icon: <Smile className="size-5" />, color: "bg-green-20", type: "happy" },
  { label: "Sad", icon: <Frown className="size-5" />, color: "bg-purple-20", type: "sad" },
  {
    label: "Neutral",
    icon: <Meh className="size-5" />,
    color: "bg-yellow-10",
    type: "neutral",
  },
  {
    label: "Anxious",
    icon: <Zap className="size-5" />,
    color: "bg-orange-10",
    type: "anxious",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [recentEntries, setRecentEntries] = useState<MoodDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMoods = async () => {
    try {
      const response = await moodAPI.getAll();
      setRecentEntries(response.data);
    } catch (error) {
      console.error("Failed to fetch moods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      fetchMoods();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
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

        {/* Recent Entries */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Entries</h2>
          <div className="space-y-3">
            {loading ? (
              <p>Loading...</p>
            ) : recentEntries.length === 0 ? (
              <p>No moods yet. Start by logging your mood!</p>
            ) : (
              recentEntries.map((entry) => (
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
            You logged <strong>5 moods</strong> this week. Keep up your
            reflection habit 🌞
          </p>
        </Card>
      </main>
    </div>
  );
}
export default Dashboard;
