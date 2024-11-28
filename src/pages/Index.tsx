import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { CarStatus } from "@/components/CarStatus";
import { Controls } from "@/components/Controls";
import { DirectionalControls } from "@/components/DirectionalControls";
import { SpeedControl } from "@/components/SpeedControl";
import { ModeSelector } from "@/components/ModeSelector";
import { WaypointMap } from "@/components/WaypointMap";
import { useToast } from "@/components/ui/toast";
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
  const { showToast } = useToast();

  const carStatus = {
    battery: 85,
    obstacleDistance: null,
    speed: speed,
  };

  const handleAddWaypoint = (coordinate: Coordinate) => {
    setWaypoints([...waypoints, coordinate]);
    showToast("Waypoint added successfully", "success");
  };

  const handleToggleRunning = () => {
    setIsRunning(!isRunning);
    showToast(isRunning ? "Mission paused" : "Mission resumed", "info");
  };

  const handleEmergencyStop = () => {
    setIsRunning(false);
    setSpeed(0);
    showToast("Emergency stop activated", "error");
  };

  const handleDirectionPress = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (mode === "waypoint") return;
    const directionMessages = {
      up: "Moving forward",
      down: "Moving backward",
      left: "Turning left",
      right: "Turning right"
    };
    showToast(directionMessages[direction], "info");
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    console.log("Speed updated:", newSpeed);
  };

  const handleModeChange = (newMode: "manual" | "waypoint") => {
    setMode(newMode);
    showToast(`Switched to ${newMode} mode`, "info");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Bot size={32} color="#9b87f5" />
            <Text style={styles.title}>Auto-Nav Explorer</Text>
            <Navigation size={32} color="#9b87f5" />
          </View>
          <ConnectionStatus isConnected={isConnected} />
        </View>

        <View style={styles.content}>
          <View style={styles.column}>
            <ModeSelector mode={mode} onModeChange={handleModeChange} />
            <CarStatus {...carStatus} />
            <SpeedControl onSpeedChange={handleSpeedChange} currentSpeed={speed} />
            <Controls
              isRunning={isRunning}
              onToggleRunning={handleToggleRunning}
              onEmergencyStop={handleEmergencyStop}
            />
            <View style={[styles.section, mode === "waypoint" && styles.disabled]}>
              <DirectionalControls onDirectionPress={handleDirectionPress} />
            </View>
          </View>
          
          <View style={[styles.column, mode === "manual" && styles.disabled]}>
            <WaypointMap onAddWaypoint={handleAddWaypoint} />
            <View style={styles.waypointList}>
              <Text style={styles.sectionTitle}>Waypoints</Text>
              {waypoints.length === 0 ? (
                <Text style={styles.emptyText}>No waypoints added yet</Text>
              ) : (
                waypoints.map((wp, index) => (
                  <View key={index} style={styles.waypointItem}>
                    <Text style={styles.waypointText}>
                      Point {index + 1}: ({wp.lat.toFixed(6)}, {wp.lng.toFixed(6)})
                    </Text>
                    <Text style={styles.waypointStatus}>
                      {index === 0 ? "Current Target" : "Queued"}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9b87f5',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  column: {
    gap: 24,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  waypointList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
  waypointItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  waypointText: {
    fontSize: 14,
  },
  waypointStatus: {
    fontSize: 12,
    color: '#666',
  },
});

export default Index;