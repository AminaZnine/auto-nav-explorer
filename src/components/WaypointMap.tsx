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
  const [points, setPoints] = useState<Coordinate[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (simplified mapping)
    const lat = ((rect.height - y) / rect.height) * 90;
    const lng = ((x / rect.width) * 360) - 180;

    const newPoint = { lat, lng };
    setPoints(prev => [...prev, newPoint]);
    onAddWaypoint(newPoint);
    toast.success("Waypoint added at coordinates: " + lat.toFixed(6) + ", " + lng.toFixed(6));
  };

  // Convert lat/lng to pixel coordinates for display
  const getPixelCoordinates = (coord: Coordinate) => {
    if (!mapRef.current) return { x: 0, y: 0 };
    const rect = mapRef.current.getBoundingClientRect();
    
    const x = ((coord.lng + 180) / 360) * rect.width;
    const y = rect.height - ((coord.lat / 90) * rect.height);
    
    return { x, y };
  };

  return (
    <div className="glass-panel rounded-xl p-4 space-y-4">
      <h2 className="text-lg font-semibold">Visual Waypoint Map</h2>
      <div
        ref={mapRef}
        className="relative w-full h-[300px] bg-slate-100 dark:bg-slate-800/50 rounded-lg cursor-crosshair overflow-hidden"
        onClick={handleClick}
      >
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-700/50" />
          ))}
        </div>
        
        {/* Draw connecting lines between points */}
        <svg className="absolute inset-0 pointer-events-none">
          {points.map((point, index) => {
            if (index === 0) return null;
            const prevPoint = points[index - 1];
            const start = getPixelCoordinates(prevPoint);
            const end = getPixelCoordinates(point);
            
            return (
              <line
                key={`line-${index}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="4"
                className="animate-fade-in"
              />
            );
          })}
        </svg>

        {/* Draw points */}
        {points.map((point, index) => {
          const { x, y } = getPixelCoordinates(point);
          return (
            <div
              key={`point-${index}`}
              className="absolute w-3 h-3 rounded-full bg-primary animate-fade-in"
              style={{
                left: `${x - 6}px`,
                top: `${y - 6}px`,
              }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                {index + 1}
              </div>
            </div>
          );
        })}

        <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary w-6 h-6 opacity-25" />
      </div>
      <p className="text-sm text-muted-foreground">
        Click anywhere on the map to add a waypoint. Points will be automatically connected in sequence.
      </p>
    </div>
  );
};