import Filter from "./filter-tabs";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-between p-2 rounded-xl border bg-card">
      <Filter />
      <Button>
        <Plus />
        Nouveau
      </Button>
    </div>
  );
}
