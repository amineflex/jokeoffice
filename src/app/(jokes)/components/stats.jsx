
import { LoaderCircle, TrafficCone } from "lucide-react";

export default function Stats() {

    // TODO: link to /api/stats/count 

    return (
    <div className="grid gap-2 p-2 rounded-xl border bg-card">
      {false ? (
        <div className="p-4 rounded-xl border bg-card text-center">
          <div className="flex items-center justify-center gap-2">
            <LoaderCircle className="w-6 h-6 animate-spin" /> 
            <p className="text-sm text-foreground/75">Chargement des statistiques...</p>
          </div>
        </div>
      ) : (
        <>
        <div className="p-4 rounded-xl border bg-card text-center">
          <div className="flex items-center justify-center gap-2">
            <TrafficCone className="w-6 h-6" /> 
            <p className="text-sm text-foreground/75">Bientôt disponible !</p>
          </div>
        </div>
        </>
      )}
    </div>
    );
}