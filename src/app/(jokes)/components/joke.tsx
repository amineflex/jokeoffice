import { Button } from "@/components/ui/button";
import { Smile, Angry } from "lucide-react";

export default function Joke() {
  return (
    <div className="p-4 border rounded-xl">
        <p className="font-medium">Comment Appelle-t-on les français scatophiles? Yann Quilico!</p>
      <div className="flex items-center">
        <p className="text-sm text-foreground/75">Yann Quilico</p>
        <div className="flex ml-auto">
          <Button
            size="icon"
            variant="ghost"
            className="text-foreground/75 hover:text-green-500"
          >
            <Smile />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-foreground/75 hover:text-red-500"
          >
            <Angry />
          </Button>
        </div>
      </div>
    </div>
  );
}
