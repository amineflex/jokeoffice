import Joke from "./joke";

export default async function Content() {

  // Fetch jokes from the API
  const res = await fetch('http://localhost:3000/api/jokes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jokes = await res.json();


  return (


    <div className="grid gap-2 p-2 rounded-xl border bg-card">
      {jokes.map((joke) => (
        <Joke key={joke.id} joke={joke} />
      ))}

    </div>
  );
}
