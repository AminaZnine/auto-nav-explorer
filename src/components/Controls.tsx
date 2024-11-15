import { AlertCircle, Pause, Play, Square, ArrowLeft, ArrowRight } from "lucide-react";

interface ControlsProps {
  isRunning: boolean;
  onToggleRunning: () => void;
  onEmergencyStop: () => void;
  onTurnLeft?: () => void;
  onTurnRight?: () => void;
}

export const Controls = ({ 
  isRunning, 
  onToggleRunning, 
  onEmergencyStop,
  onTurnLeft,
  onTurnRight 
}: ControlsProps) => {
  return (
    <div className="glass-panel rounded-xl p-4 space-y-4">
      <h2 className="text-lg font-semibold">Controls</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button
            onClick={onToggleRunning}
            className={`flex-1 control-button ${
              isRunning
                ? "bg-car-warning text-white"
                : "bg-car-success text-white"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 inline-block mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 inline-block mr-2" />
                Resume
              </>
            )}
          </button>
          <button
            onClick={onEmergencyStop}
            className="flex-1 control-button bg-car-error text-white"
          >
            <Square className="w-4 h-4 inline-block mr-2" />
            Emergency Stop
          </button>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onTurnLeft}
            className="control-button bg-car-neutral text-white px-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onTurnRight}
            className="control-button bg-car-neutral text-white px-8"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};