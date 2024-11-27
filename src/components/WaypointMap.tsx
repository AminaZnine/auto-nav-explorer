import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

interface Coordinate {
  lat: number;
  lng: number;
}

interface WaypointMapProps {
  onAddWaypoint: (coordinate: Coordinate) => void;
}

export const WaypointMap = ({ onAddWaypoint }: WaypointMapProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (simplified mapping)
    const lat = ((rect.height - y) / rect.height) * 90;
    const lng = ((x / rect.width) * 360) - 180;

    onAddWaypoint({ lat, lng });
    toast.success("Waypoint added at coordinates: " + lat.toFixed(6) + ", " + lng.toFixed(6));
  };

  return (
    <div className="glass-panel rounded-xl p-4 space-y-4">
      <h2 className="text-lg font-semibold">Visual Waypoint Map</h2>
      <div
        ref={mapRef}
        className="relative w-full h-[300px] bg-slate-100 rounded-lg cursor-crosshair"
        onClick={handleClick}
      >
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-slate-200" />
          ))}
        </div>
        <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary w-6 h-6" />
      </div>
      <p className="text-sm text-muted-foreground">
        Click anywhere on the map to add a waypoint. The grid represents a simplified world map.
      </p>
    </div>
  );
};