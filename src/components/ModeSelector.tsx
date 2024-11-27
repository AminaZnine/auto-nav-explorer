import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bot, GameController2, MapPin } from "lucide-react";

interface ModeSelectorProps {
  mode: "manual" | "waypoint";
  onModeChange: (mode: "manual" | "waypoint") => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="glass-panel rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-5 h-5 text-[#9b87f5]" />
        <h2 className="text-lg font-semibold text-[#9b87f5]">Operation Mode</h2>
      </div>
      
      <RadioGroup
        value={mode}
        onValueChange={(value: "manual" | "waypoint") => onModeChange(value)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className={`flex items-center space-x-2 p-4 rounded-lg cursor-pointer transition-all duration-200 
          ${mode === 'manual' ? 'bg-[#9b87f5]/20 border-[#9b87f5]/50' : 'bg-white/5 border-white/10'} 
          border hover:border-[#9b87f5]/30 hover:bg-[#9b87f5]/10`}
        >
          <RadioGroupItem value="manual" id="manual" className="text-[#9b87f5]" />
          <Label htmlFor="manual" className="flex items-center gap-2 cursor-pointer">
            <GameController2 className="w-4 h-4 text-[#9b87f5]" />
            <span>Manual Control</span>
          </Label>
        </div>

        <div className={`flex items-center space-x-2 p-4 rounded-lg cursor-pointer transition-all duration-200 
          ${mode === 'waypoint' ? 'bg-[#9b87f5]/20 border-[#9b87f5]/50' : 'bg-white/5 border-white/10'} 
          border hover:border-[#9b87f5]/30 hover:bg-[#9b87f5]/10`}
        >
          <RadioGroupItem value="waypoint" id="waypoint" className="text-[#9b87f5]" />
          <Label htmlFor="waypoint" className="flex items-center gap-2 cursor-pointer">
            <MapPin className="w-4 h-4 text-[#9b87f5]" />
            <span>Waypoint Navigation</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};