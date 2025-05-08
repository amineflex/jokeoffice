import { Button } from "@/components/ui/button";
import { Smile, Angry } from "lucide-react";
import Link from 'next/link'

export default function Joke({joke}) {
  return (
    <div className="p-4 border rounded-xl">
        <p className="font-medium">{joke.content}</p>
      <div className="flex items-center">
        <div>
          <Link href={`profile/${joke.username}`} className="text-sm text-foreground/75 hover:text-white"><span className="text-gray-500">@</span>{joke.username}</Link>
          {" "}·{" "}
          <small className="text-foreground/50">{new Date(joke.createdAt).toLocaleString()}</small>
        </div>
        <div className="flex ml-auto space-x-1">
          <Button
            size="icon"
            variant="ghost"
            className="text-foreground/75 hover:text-green-500 px-1"
          >
            <Smile /> <small className="text-foreground/50">{joke.likes}</small>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-foreground/75 hover:text-red-500 px-1"
          >
            <Angry /> <small className="text-foreground/50">{joke.dislikes}</small>
          </Button>
        </div>
      </div>
    </div>
  );
}
