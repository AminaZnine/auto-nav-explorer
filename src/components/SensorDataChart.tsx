import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface SensorDataPoint {
  timestamp: Date;
  temperature: number;
  humidity: number;
}

interface SensorDataChartProps {
  data: SensorDataPoint[];
}

export const SensorDataChart = ({ data }: SensorDataChartProps) => {
  const formattedData = data.map(point => ({
    ...point,
    time: format(new Date(point.timestamp), 'HH:mm:ss'),
  }));

  return (
    <div className="glass-panel p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Sensor Data History</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="temp" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="humidity" orientation="right" label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="temp"
              type="monotone" 
              dataKey="temperature" 
              stroke="#8884d8" 
              name="Temperature"
            />
            <Line 
              yAxisId="humidity"
              type="monotone" 
              dataKey="humidity" 
              stroke="#82ca9d" 
              name="Humidity"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};