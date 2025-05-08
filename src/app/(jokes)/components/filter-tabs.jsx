import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Smile, Angry } from "lucide-react";

export default function FilterTabs() {
  return (
    <Tabs defaultValue="recent">
      <TabsList className="p-0">
        <TabsTrigger value="recent" className="h-9">
          <Clock />
          Récent
        </TabsTrigger>
        <TabsTrigger value="appreciated" className="h-9">
          <Smile />
          Apprécié
        </TabsTrigger>
        <TabsTrigger value="hated" className="h-9">
          <Angry />
          Détesté
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
