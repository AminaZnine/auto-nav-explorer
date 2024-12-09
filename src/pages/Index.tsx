import { useState, useEffect } from "react";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { CarStatus } from "@/components/CarStatus";
import { Controls } from "@/components/Controls";
import { DirectionalControls } from "@/components/DirectionalControls";
import { SpeedControl } from "@/components/SpeedControl";
import { ModeSelector } from "@/components/ModeSelector";
import { WaypointMap } from "@/components/WaypointMap";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Navigation } from "lucide-react";

interface Coordinate {
  lat: number;
  lng: number;
}

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [waypoints, setWaypoints] = useState<Coordinate[]>([]);
  const [speed, setSpeed] = useState(15);
  const [mode, setMode] = useState<"manual" | "waypoint">("manual");
  const { toast } = useToast();

  const [carLocation, setCarLocation] = useState<Coordinate & { timestamp: Date }>({
    lat: 0,
    lng: 0,
    timestamp: new Date()
  });

  const carStatus = {
    battery: 85,
    obstacleDistance: null,
    speed: speed,
    gpsLocation: carLocation
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning && isMoving) {
        setCarLocation(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
          timestamp: new Date()
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning, isMoving]);

  const handleAddWaypoint = (coordinate: Coordinate) => {
    setWaypoints([...waypoints, coordinate]);
    toast({
      title: "Success",
      description: "Waypoint added successfully"
    });
  };

  const handleToggleRunning = () => {
    setIsRunning(!isRunning);
    setIsMoving(!isRunning);
    toast({
      description: isRunning ? "Mission paused" : "Mission resumed"
    });
  };

  const handleEmergencyStop = () => {
    setIsRunning(false);
    setIsMoving(false);
    setSpeed(0);
    toast({
      description: "Emergency stop activated",
      className: "bg-red-500 text-white"
    });
  };

  const handleDirectionPress = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (mode === "waypoint") return;
    const directionMessages = {
      up: "Moving forward",
      down: "Moving backward",
      left: "Turning left",
      right: "Turning right"
    };
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 1000);
    toast({
      description: directionMessages[direction]
    });
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    console.log("Speed updated:", newSpeed);
  };

  const handleModeChange = (newMode: "manual" | "waypoint") => {
    setMode(newMode);
    toast({
      description: `Switched to ${newMode} mode`
    });
  };

  const handleRefreshStatus = () => {
    toast({
      description: "Refreshing vehicle status..."
    });
    setCarLocation(prev => ({
      ...prev,
      timestamp: new Date()
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-purple-900 p-2 sm:p-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <header className="glass-panel p-4 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
              Auto-Nav Explorer
            </h1>
            <Navigation className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
          <ConnectionStatus isConnected={isConnected} />
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <ModeSelector mode={mode} onModeChange={handleModeChange} />
            <CarStatus {...carStatus} onRefreshStatus={handleRefreshStatus} />
            <SpeedControl onSpeedChange={handleSpeedChange} currentSpeed={speed} />
            <Controls
              isRunning={isRunning}
              onToggleRunning={handleToggleRunning}
              onEmergencyStop={handleEmergencyStop}
            />
            <div className={`transition-opacity duration-300 ${mode === "waypoint" ? "opacity-50 pointer-events-none" : ""}`}>
              <DirectionalControls onDirectionPress={handleDirectionPress} />
            </div>
          </div>
          
          <div 
            className={`space-y-4 animate-fade-in transition-opacity duration-300 ${mode === "manual" ? "opacity-50 pointer-events-none" : ""}`}
            style={{ animationDelay: "0.2s" }}
          >
            <WaypointMap 
              onAddWaypoint={handleAddWaypoint} 
              carLocation={carLocation}
              isMoving={isMoving}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;