import { useState } from "react";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { CarStatus } from "@/components/CarStatus";
import { CoordinateInput } from "@/components/CoordinateInput";
import { Controls } from "@/components/Controls";
import { DirectionalControls } from "@/components/DirectionalControls";
import { SpeedControl } from "@/components/SpeedControl";
import { ModeSelector } from "@/components/ModeSelector";
import { WaypointMap } from "@/components/WaypointMap";
import { toast } from "sonner";
import { Bot, Navigation } from "lucide-react";

interface Coordinate {
  lat: number;
  lng: number;
}

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [waypoints, setWaypoints] = useState<Coordinate[]>([]);
  const [speed, setSpeed] = useState(15);
  const [mode, setMode] = useState<"manual" | "waypoint">("manual");

  // Simulated car status - in real app, this would come from Arduino
  const carStatus = {
    battery: 85,
    obstacleDistance: null,
    speed: speed,
  };

  const handleAddWaypoint = (coordinate: Coordinate) => {
    setWaypoints([...waypoints, coordinate]);
    toast.success("Waypoint added successfully");
  };

  const handleToggleRunning = () => {
    setIsRunning(!isRunning);
    toast.info(isRunning ? "Mission paused" : "Mission resumed");
  };

  const handleEmergencyStop = () => {
    setIsRunning(false);
    setSpeed(0);
    toast.error("Emergency stop activated");
  };

  const handleDirectionPress = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (mode === "waypoint") return;
    const directionMessages = {
      up: "Moving forward",
      down: "Moving backward",
      left: "Turning left",
      right: "Turning right"
    };
    toast.info(directionMessages[direction]);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    console.log("Speed updated:", newSpeed);
  };

  const handleModeChange = (newMode: "manual" | "waypoint") => {
    setMode(newMode);
    toast.info(`Switched to ${newMode} mode`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/50 dark:to-purple-950/10 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
              Auto-Nav Explorer
            </h1>
            <Navigation className="w-8 h-8 text-purple-500" />
          </div>
          <ConnectionStatus isConnected={isConnected} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ModeSelector mode={mode} onModeChange={handleModeChange} />
            <CarStatus {...carStatus} />
            <SpeedControl onSpeedChange={handleSpeedChange} currentSpeed={speed} />
            <Controls
              isRunning={isRunning}
              onToggleRunning={handleToggleRunning}
              onEmergencyStop={handleEmergencyStop}
            />
            <div className={mode === "waypoint" ? "opacity-50 pointer-events-none" : ""}>
              <DirectionalControls onDirectionPress={handleDirectionPress} />
            </div>
          </div>
          
          <div className={`space-y-6 ${mode === "manual" ? "opacity-50 pointer-events-none" : ""}`}>
            <CoordinateInput onAddWaypoint={handleAddWaypoint} />
            <WaypointMap onAddWaypoint={handleAddWaypoint} />
            <div className="glass-panel p-4 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Navigation className="w-5 h-5 text-purple-500" />
                Waypoints
              </h2>
              {waypoints.length === 0 ? (
                <p className="text-muted-foreground text-sm">No waypoints added yet</p>
              ) : (
                <ul className="space-y-2">
                  {waypoints.map((wp, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-background/50 dark:bg-background/20 transition-colors duration-200 hover:bg-background/70 dark:hover:bg-background/30"
                    >
                      <span className="text-sm">
                        Point {index + 1}: ({wp.lat.toFixed(6)}, {wp.lng.toFixed(6)})
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {index === 0 ? "Current Target" : "Queued"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;