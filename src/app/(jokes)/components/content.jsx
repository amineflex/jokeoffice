import Joke from "./joke";

export default async function Content({username}) {

  // Fetch jokes from the API

  const endpoint = process.env.NEXT_PUBLIC_API_BASE_URL
  const route = username ? `/api/jokes/${username}` : '/api/jokes';

  
  try {
  const res = await fetch(endpoint + route, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jokes = await res.json();
  jokes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (


    <div className="grid gap-2 p-2 rounded-xl border bg-card">
      {(jokes.length === 0)? (
        <div className="p-4 rounded-xl border bg-card text-center">
          <p className="text-sm text-foreground/75">Aucune blague trouvée</p>
        </div>
      ) : (
        jokes.map((joke) => (
          <Joke key={joke.id} joke={joke} />
        ))
      )}

    </div>
  );
  
  }
  catch (error) {
    console.error('Error fetching jokes:', error);
    return (
      <div className="p-4 rounded-xl border bg-card text-center">
        <p className="text-sm text-foreground/75">Erreur lors de la récupération des blagues</p>
      </div>
    );
  }


}
