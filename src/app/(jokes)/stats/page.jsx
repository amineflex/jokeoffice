import Nav from "../components/nav-tabs";
import Stats from "../components/stats";

export default function StatsPage() {
  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="grid gap-2 max-w-2xl w-full p-6">
        <Nav />
        <Stats />
      </div>
    </div>
  );
}
