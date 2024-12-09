import { useState } from "react";
import { MapPin, Send, Trash, History } from "lucide-react";
import { toast } from "sonner";
import { LeafletMap } from "./LeafletMap";

interface Coordinate {
  lat: number;
  lng: number;
}

interface WaypointMapProps {
  onAddWaypoint: (coordinate: Coordinate) => void;
  carLocation?: Coordinate;
  isMoving?: boolean;
}

export const WaypointMap = ({ onAddWaypoint, carLocation, isMoving }: WaypointMapProps) => {
  const [points, setPoints] = useState<Coordinate[]>([]);

  const handleMapClick = (coord: Coordinate) => {
    setPoints(prev => [...prev, coord]);
    onAddWaypoint(coord);
    toast.success(`Waypoint added at: ${coord.lat.toFixed(6)}, ${coord.lng.toFixed(6)}`);
  };

  const handleClearAllWaypoints = () => {
    setPoints([]);
    toast.info("All waypoints cleared");
  };

  const handleClearPreviousWaypoint = () => {
    if (points.length > 0) {
      setPoints(prev => prev.slice(0, -1));
      toast.info("Previous waypoint removed");
    } else {
      toast.error("No waypoints to remove");
    }
  };

  const handleSendInstructions = () => {
    if (points.length === 0) {
      toast.error("No waypoints to send");
      return;
    }
    toast.success("Instructions sent to vehicle");
    console.log("Sending waypoints to car:", points);
  };

  return (
    <div className="space-y-4">
      <div className="glass-panel rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Visual Waypoint Map</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSendInstructions}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-purple-500"
              title="Send instructions to vehicle"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        <LeafletMap 
          points={points}
          carLocation={carLocation}
          onMapClick={handleMapClick}
        />

        <p className="text-sm text-muted-foreground">
          Click anywhere on the map to add a waypoint. Points will be automatically connected in sequence.
        </p>
      </div>

      <div className="glass-panel rounded-xl p-3 flex justify-center gap-4">
        <button
          onClick={handleClearPreviousWaypoint}
          className="control-button flex items-center gap-2"
          title="Clear previous waypoint"
        >
          <History className="w-5 h-5" />
          <span>Clear Previous</span>
        </button>
        <button
          onClick={handleClearAllWaypoints}
          className="control-button flex items-center gap-2"
          title="Clear all waypoints"
        >
          <Trash className="w-5 h-5" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};