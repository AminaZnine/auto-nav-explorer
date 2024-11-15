import { useState } from "react";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { CarStatus } from "@/components/CarStatus";
import { CoordinateInput } from "@/components/CoordinateInput";
import { Controls } from "@/components/Controls";
import { DirectionalControls } from "@/components/DirectionalControls";
import { SpeedControl } from "@/components/SpeedControl";
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

  // Simulated car status - in real app, this would come from Arduino
  const carStatus = {
    battery: 85,
    obstacleDistance: null, // Set to null since we're not using it yet
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
    const directionMessages = {
      up: "Moving forward",
      down: "Moving backward",
      left: "Turning left",
      right: "Turning right"
    };
    toast.info(directionMessages[direction]);
    // Here you would add the actual Bluetooth communication logic
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    toast.info(`Speed set to ${newSpeed} km/h`);
    // Here you would add the actual Bluetooth communication logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Autonomous Car Control</h1>
          <ConnectionStatus isConnected={isConnected} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <CarStatus {...carStatus} />
            <Controls
              isRunning={isRunning}
              onToggleRunning={handleToggleRunning}
              onEmergencyStop={handleEmergencyStop}
            />
            <SpeedControl speed={speed} onSpeedChange={handleSpeedChange} />
            <DirectionalControls onDirectionPress={handleDirectionPress} />
          </div>
          <div className="space-y-6">
            <CoordinateInput onAddWaypoint={handleAddWaypoint} />
            <div className="glass-panel rounded-xl p-4 space-y-4">
              <h2 className="text-lg font-semibold">Waypoints</h2>
              {waypoints.length === 0 ? (
                <p className="text-muted-foreground text-sm">No waypoints added yet</p>
              ) : (
                <ul className="space-y-2">
                  {waypoints.map((wp, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/50"
                    >
                      <span className="text-sm">
                        Point {index + 1}: ({wp.lat}, {wp.lng})
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