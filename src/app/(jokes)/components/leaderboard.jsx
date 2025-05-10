
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

export default function Leaderboard() {

    // get /api/jokes/top

    const [top, setTop] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTop = async () => {
            const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
            const route = "/api/stats/top";

            try {
                const res = await fetch(endpoint + route, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const top = await res.json();
                setTop(top);
            } catch (err) {
                console.error("Error fetching leaderboard:", err);
                setError(err);
            }
        };

        fetchTop();
    }, []);


    const lb = top?.userCounts || [];
    console.log(lb);
    
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
          {lb.length === 0 ? (
            <div className="p-4 rounded-xl border bg-card text-center">
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="w-6 h-6 animate-spin" /> 
                <p className="text-sm text-foreground/75">Chargement du classement...</p>
              </div>
            </div>
          ) : (
            <div>
                <div className="flex items-center justify-between p-4 rounded-xl border bg-card text-center">
                    <h2 className="text-lg font-bold">Classement</h2>
                    <p className="text-sm text-foreground/75">Nombre de blagues</p>
                </div>

                <div className="grid gap-2 p-2 rounded-xl border bg-card mt-2">
                    {lb.map((user, index) => {
                        let rankColor = "";
                        if (index === 0) rankColor = "yellow-500"; // Gold border-yellow-500 shadow-yellow-500
                        else if (index === 1) rankColor = "gray-400"; // Silver border-gray-400 shadow-gray-400 
                        else if (index === 2) rankColor = "orange-500"; // Bronze border-orange-500 shadow-orange-500

                        return (
                            <div key={index} className={`flex items-center justify-between p-4 rounded-xl border bg-card text-center border-${rankColor} shadow-${rankColor} duration-300`}>
                                <span className="inline-flex items-center gap-4">
                                    <p 
                                        className={`text-lg text-foreground/75 text-${rankColor}`}
                                    >
                                        #{index + 1}
                                    </p>
                                    <Link href={`/profile/${user.username}`} className="text-sm text-foreground/75 hover:text-white font-semibold">
                                        @{user.username}
                                    </Link>
                                </span>
                                <p className="text-sm text-foreground/75">{user._count.username} blagues</p>
                            </div>
                        );
                    })}
                </div>
            </div>
          )}
        </div>
    );
}