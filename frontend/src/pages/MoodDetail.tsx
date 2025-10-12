import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { moodAPI, quotesAPI } from "../lib/api";
import type { MoodDTO } from "../types/mood";
import { moodLabels } from "../types/mood";
import ZenQuote from "../components/ZenQuote";

function MoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<MoodDTO | null>(null);
  const [quote, setQuote] = useState({ q: "", a: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMood = async () => {
      try {
        const response = await moodAPI.getById(id);
        setEntry(response.data);
      } catch (err) {
        console.error("Failed to fetch mood:", err);
        setError("Failed to load mood");
      } finally {
        setLoading(false);
      }
    };
    fetchMood();
  }, [id]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const quotesResponse = await quotesAPI.getDailyQuote();
        console.log(quotesResponse);
        setQuote(quotesResponse.data);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <p>{error || "Mood not found."}</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this mood?")) return;
    try {
      await moodAPI.delete(entry._id);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete mood:", err);
      // TODO: show error
    }
  };

  const handleEdit = () => {
    // TODO: navigate to edit page
    navigate(`/edit-mood/${entry._id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        {/* Mood Details */}
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                {moodLabels[entry.mood]}
              </h1>
              <p className="text-muted-foreground">
                {new Date(entry.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleEdit}
                className="opacity-80 cursor-pointer hover:opacity-100"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="opacity-80, cursor-pointer hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <CardContent className="space-y-4">
            {entry.note && (
              <div>
                <h2 className="text-lg font-medium mb-2">Your Note</h2>
                <p className="text-foreground/90 leading-relaxed bg-muted/30 p-4 rounded-md">
                  {entry.note}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        <ZenQuote quote={quote?.q} author={quote?.a} />
      </main>
    </div>
  );
}
export default MoodDetail;
