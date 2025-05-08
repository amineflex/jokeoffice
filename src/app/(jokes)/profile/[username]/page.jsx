import Content from "../../components/content";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export default function Home({ params }) {
  const { username } = params;
  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="grid gap-2 max-w-2xl w-full p-6">
        <div className="p-4 rounded-xl border">
            <div className="flex items-center space-x-2">
                <Link href="/" className="text-foreground/75 hover:text-white"><ArrowLeft /></Link>
                <h1 className="text-2xl font-bold"><span className="text-gray-500">@</span>{decodeURIComponent(username)}</h1>
            </div>
        </div>
        <Content username={username} />
      </div>
    </div>
  );
}