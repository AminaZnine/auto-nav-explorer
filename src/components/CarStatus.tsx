import { Battery, Navigation2, Shield } from "lucide-react";

interface CarStatusProps {
  battery: number;
  obstacleDistance: number | null;
  speed: number;
}

export const CarStatus = ({ battery, obstacleDistance, speed }: CarStatusProps) => {
  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-car-success";
    if (level > 20) return "text-car-warning";
    return "text-car-error";
  };

  const getObstacleColor = (distance: number | null) => {
    if (distance === null) return "text-gray-500";
    if (distance > 100) return "text-car-success";
    if (distance > 50) return "text-car-warning";
    return "text-car-error";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#9b87f5]">Car Status</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <Battery className={`w-8 h-8 ${getBatteryColor(battery)}`} />
          <div className="text-center">
            <span className="text-lg font-medium">{battery}%</span>
            <p className="text-xs text-gray-400">Battery</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <Shield className={`w-8 h-8 ${getObstacleColor(obstacleDistance)}`} />
          <div className="text-center">
            <span className="text-lg font-medium">
              {obstacleDistance ? `${obstacleDistance}cm` : 'N/A'}
            </span>
            <p className="text-xs text-gray-400">Distance</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <Navigation2 className="w-8 h-8 text-[#9b87f5]" />
          <div className="text-center">
            <span className="text-lg font-medium">{speed}</span>
            <p className="text-xs text-gray-400">km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};