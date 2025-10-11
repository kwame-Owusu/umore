import NavBar from "../components/NavBar";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Smile, Frown, Meh, Angry } from "lucide-react";

const moods = [
  { label: "Happy", icon: <Smile className="size-5" />, color: "bg-green-20" },
  { label: "Sad", icon: <Frown className="size-5" />, color: "bg-purple-20" },
  {
    label: "Neutral",
    icon: <Meh className="size-5" />,
    color: "bg-yellow-10",
  },
  {
    label: "Angry",
    icon: <Angry className="size-5" />,
    color: "bg-orange-10",
  },
];

const recentEntries = [
  {
    id: 1,
    mood: "Happy",
    date: "June 15, 2024",
    note: "Had a relaxing day 🌿",
  },
  { id: 2, mood: "Sad", date: "June 14, 2024", note: "Felt a bit overwhelmed" },
  { id: 3, mood: "Neutral", date: "June 13, 2024", note: "Pretty normal day" },
];

export default function Dashboard() {
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
                className={`rounded-full w-14 h-14 hover:bg-muted transition ${mood.color}`}
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
            {recentEntries.map((entry) => (
              <Card
                key={entry.id}
                className="hover:shadow-md transition-all cursor-pointer"
              >
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-medium">{entry.mood}</h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.date}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                    {entry.note}
                  </p>
                </CardContent>
              </Card>
            ))}
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
