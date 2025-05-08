import Joke from "./joke";

export default function Content() {
  return (
    <div className="grid gap-2 p-2 rounded-xl border bg-card">
      <Joke />
      <Joke />
      <Joke />
      <Joke />
      <Joke />
      <Joke />
    </div>
  );
}
