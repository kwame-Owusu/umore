import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { moodAPI } from "../lib/api";
import type { MoodType } from "../types/mood";

const moodLabels: Record<MoodType, string> = {
  happy: "Happy",
  sad: "Sad",
  angry: "Angry",
  neutral: "Neutral",
  excited: "Excited",
};

function CreateMood() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const moodType = searchParams.get("type") as MoodType;
  if (!moodType || !moodLabels[moodType]) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <p>Invalid mood type.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await moodAPI.create({ mood: moodType, note: note || undefined });
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create mood:", error);
      // TODO: show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Card>
          <CardHeader>
            <CardTitle>
              Why are you feeling {moodLabels[moodType].toLowerCase()}?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="note">Note (optional)</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about your day..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Mood"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default CreateMood;
