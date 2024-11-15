import { Slider } from "@/components/ui/slider";

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const SpeedControl = ({ speed, onSpeedChange }: SpeedControlProps) => {
  return (
    <div className="glass-panel rounded-xl p-4 space-y-4">
      <h2 className="text-lg font-semibold">Speed Control</h2>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Current Speed: {speed} km/h</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(values) => onSpeedChange(values[0])}
          max={30}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0 km/h</span>
          <span>30 km/h</span>
        </div>
      </div>
    </div>
  );
};