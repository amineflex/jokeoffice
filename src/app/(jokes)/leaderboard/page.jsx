import Nav from "../components/nav-tabs";
import Leaderboard from "../components/leaderboard";

export default function LeaderboardPage() {
  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="grid gap-2 max-w-2xl w-full p-6">
        <Nav />
        <Leaderboard />
      </div>
    </div>
  );
}
