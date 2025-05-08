"use client"


import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import Joke from "./joke";

export default function Content({ username }) {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJokes = async () => {
      const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
      const route = username ? `/api/jokes/${username}` : "/api/jokes";

      try {
        const res = await fetch(endpoint + route, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJokes(data);
      } catch (err) {
        console.error("Error fetching jokes:", err);
        setError(err);
      }
    };

    fetchJokes();
  }, [username]);

  if (error) {
    return (
      <div className="p-4 rounded-xl border bg-card text-center">
        <p className="text-sm text-foreground/75">
          Erreur lors de la récupération des blagues
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-2 p-2 rounded-xl border bg-card">
      {jokes.length === 0 ? (
        <div className="p-4 rounded-xl border bg-card text-center">
          <div className="flex items-center justify-center gap-2">
            <LoaderCircle className="w-6 h-6 animate-spin" /> 
            <p className="text-sm text-foreground/75">Chargement des blagues...</p>
          </div>
        </div>
      ) : (
        jokes.map((joke) => <Joke key={joke.id} joke={joke} />)
      )}
    </div>
  );
}
