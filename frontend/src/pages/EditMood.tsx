import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { moodAPI } from "../lib/api";
import type { MoodType, UpdateMoodRequest } from "../types/mood";

const moodLabels: Record<MoodType, string> = {
  happy: "Happy",
  sad: "Sad",
  anxious: "Anxious",
  neutral: "Neutral",
  excited: "Excited",
};

function EditMood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mood, setMood] = useState<MoodType>("happy");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchMood = async () => {
      try {
        const response = await moodAPI.getById(id);
        const data = response.data;
        setMood(data.mood);
        setNote(data.note || "");
      } catch (error) {
        console.error("Failed to fetch mood:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchMood();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      const updateData: UpdateMoodRequest = { mood, note: note || undefined };
      await moodAPI.update(id, updateData);
      navigate(`/mood/${id}`);
    } catch (error) {
      console.error("Failed to update mood:", error);
      // TODO: show error
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Card>
          <CardHeader>
            <CardTitle>Edit Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="mood">Mood</Label>
                <select
                  id="mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value as MoodType)}
                  className="w-full p-2 border rounded"
                >
                  {Object.entries(moodLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about your day..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
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

export default EditMood;