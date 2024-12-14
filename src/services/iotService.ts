import { useQuery } from "@tanstack/react-query";

interface SensorData {
  timestamp: Date;
  temperature: number;
  humidity: number;
  batteryLevel: number;
  speed: number;
  obstacleDistance: number | null;
  location: {
    lat: number;
    lng: number;
  };
}

const BACKEND_URL = "http://your-backend-url"; // Replace with your actual backend URL

export const fetchLatestSensorData = async (): Promise<SensorData> => {
  const response = await fetch(`${BACKEND_URL}/api/sensor-data/latest`);
  if (!response.ok) {
    throw new Error('Failed to fetch sensor data');
  }
  const data = await response.json();
  return {
    ...data,
    timestamp: new Date(data.timestamp)
  };
};

export const useSensorData = () => {
  return useQuery({
    queryKey: ['sensorData'],
    queryFn: fetchLatestSensorData,
    refetchInterval: 5000, // Poll every 5 seconds
  });
};