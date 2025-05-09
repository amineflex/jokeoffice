import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile, Angry } from "lucide-react";
import Link from "next/link";

export default function Joke({ joke }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchVoteStatus = async () => {
      const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
      const route = `/api/votes/status/${joke.id}`;
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setLiked(data.type === "like");
        setDisliked(data.type === "dislike");
      } else {
        console.error("Error fetching vote status:", res.statusText);
      }
    };

    fetchVoteStatus();
  }, [joke.id]);

  const handleLike = async () => {
    const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
    const route = `/api/votes/like/${joke.id}`;
    const res = await fetch(endpoint + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: true }),
    });

    if (res.ok) {
      setLiked(true);
      setDisliked(false); // Annule le dislike si présent
      joke.likes += 1; // Incrémente le compteur de likes
      if (disliked) joke.dislikes -= 1; // Décrémente le compteur de dislikes si nécessaire
    } else {
      console.error("Error liking joke:", res.statusText);
    }
  };

  const handleDislike = async () => {
    const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
    const route = `/api/votes/dislike/${joke.id}`;
    const res = await fetch(endpoint + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: false }),
    });

    if (res.ok) {
      setDisliked(true);
      setLiked(false); // Annule le like si présent
      joke.dislikes += 1; // Incrémente le compteur de dislikes
      if (liked) joke.likes -= 1; // Décrémente le compteur de likes si nécessaire
    } else {
      console.error("Error disliking joke:", res.statusText);
    }
  };

  return (
    <div className="p-4 border rounded-xl">
      <p className="font-medium"><span className="font-bold text-amber-500">#{joke.id}<span/>{" "}{joke.content}</p>
      <div className="flex items-center">
        <div>
          <Link
            href={`profile/${joke.username}`}
            className="text-sm text-foreground/75 hover:text-white"
          >
            <span className="text-gray-500">@</span>
            {joke.username}
          </Link>{" "}
          ·{" "}
          <small className="text-foreground/50">
            {new Date(joke.createdAt).toLocaleString()}
          </small>
        </div>
        <div className="flex ml-auto space-x-1">
          <Button
            onClick={handleLike}
            variant="ghost"
            className={`text-foreground/75 px-1 ${
              liked ? "text-green-500 hover:text-green-500" : "hover:text-green-500"
            }`}
          >
            <Smile /> <small className="text-foreground/50">{joke.likes}</small>
          </Button>
          <Button
            onClick={handleDislike}
            variant="ghost"
            className={`text-foreground/75 px-1 ${
              disliked ? "text-red-500 hover:text-red-500" : "hover:text-red-500"
            }`}
          >
            <Angry />{" "}
            <small className="text-foreground/50">{joke.dislikes}</small>
          </Button>
        </div>
      </div>
    </div>
  );
}
