import Toolbar from "./components/toolbar";
import Content from "./components/content";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="grid gap-2 max-w-2xl w-full p-6">
        <Toolbar />
        <Content username={null} /> 
      </div>
    </div>
  );
}
