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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3D] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] text-transparent bg-clip-text">
            Autonomous Car Control
          </h1>
          <ConnectionStatus isConnected={isConnected} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="glass-panel rounded-xl p-6 space-y-6 backdrop-blur-lg">
              <CarStatus {...carStatus} />
              <SpeedControl onSpeedChange={handleSpeedChange} currentSpeed={speed} />
              <Controls
                isRunning={isRunning}
                onToggleRunning={handleToggleRunning}
                onEmergencyStop={handleEmergencyStop}
              />
            </div>
            <div className={`glass-panel rounded-xl p-6 ${mode === "waypoint" ? "opacity-50 pointer-events-none" : ""}`}>
              <DirectionalControls onDirectionPress={handleDirectionPress} />
            </div>
          </div>

          <div className={`space-y-6 ${mode === "manual" ? "opacity-50 pointer-events-none" : ""}`}>
            <ModeSelector mode={mode} onModeChange={handleModeChange} />
            <div className="glass-panel rounded-xl p-6 space-y-6">
              <CoordinateInput onAddWaypoint={handleAddWaypoint} />
              <WaypointMap onAddWaypoint={handleAddWaypoint} />
            </div>
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#9b87f5] mb-4">Waypoints</h2>
              {waypoints.length === 0 ? (
                <p className="text-gray-400">No waypoints added yet</p>
              ) : (
                <ul className="space-y-3">
                  {waypoints.map((wp, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-[#9b87f5]/20"
                    >
                      <span className="text-sm text-gray-300">
                        Point {index + 1}: ({wp.lat.toFixed(6)}, {wp.lng.toFixed(6)})
                      </span>
                      <span className="text-xs text-[#9b87f5]">
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