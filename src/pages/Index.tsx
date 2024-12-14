import { useState, useEffect } from "react";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { CarStatus } from "@/components/CarStatus";
import { Controls } from "@/components/Controls";
import { DirectionalControls } from "@/components/DirectionalControls";
import { SpeedControl } from "@/components/SpeedControl";
import { ModeSelector } from "@/components/ModeSelector";
import { WaypointMap } from "@/components/WaypointMap";
import { SensorDataChart } from "@/components/SensorDataChart";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Navigation } from "lucide-react";
import { useSensorData } from "@/services/iotService";

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

  // Simulated car location for demonstration
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

  // Simulate periodic GPS updates
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
    // Here you would typically fetch the latest status from the vehicle
    setCarLocation(prev => ({
      ...prev,
      timestamp: new Date()
    }));
  };

  // Add IoT data integration
  const { data: sensorData, isError } = useSensorData();

  useEffect(() => {
    if (isError) {
      toast({
        description: "Failed to fetch sensor data",
        variant: "destructive"
      });
    }
  }, [isError, toast]);

  useEffect(() => {
    if (sensorData) {
      // Update car status with real sensor data
      setCarLocation({
        lat: sensorData.location.lat,
        lng: sensorData.location.lng,
        timestamp: sensorData.timestamp
      });
    }
  }, [sensorData]);

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            <h1 className="text-xl sm:text-2xl font-bold text-purple-500">Auto-Nav Explorer</h1>
            <Navigation className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
          <ConnectionStatus isConnected={isConnected} />
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4">
            <ModeSelector mode={mode} onModeChange={handleModeChange} />
            <CarStatus 
              battery={sensorData?.batteryLevel ?? carStatus.battery}
              obstacleDistance={sensorData?.obstacleDistance ?? carStatus.obstacleDistance}
              speed={sensorData?.speed ?? speed}
              gpsLocation={carLocation}
              onRefreshStatus={handleRefreshStatus}
            />
            <SpeedControl onSpeedChange={handleSpeedChange} currentSpeed={speed} />
            <Controls
              isRunning={isRunning}
              onToggleRunning={handleToggleRunning}
              onEmergencyStop={handleEmergencyStop}
            />
            <div className={`${mode === "waypoint" ? "opacity-50 pointer-events-none" : ""}`}>
              <DirectionalControls onDirectionPress={handleDirectionPress} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`${mode === "manual" ? "opacity-50 pointer-events-none" : ""}`}>
              <WaypointMap 
                onAddWaypoint={handleAddWaypoint} 
                carLocation={carLocation}
                isMoving={isMoving}
              />
            </div>
            {sensorData && (
              <SensorDataChart 
                data={[
                  {
                    timestamp: sensorData.timestamp,
                    temperature: 25, // Replace with actual temperature data
                    humidity: 60, // Replace with actual humidity data
                  }
                ]} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
