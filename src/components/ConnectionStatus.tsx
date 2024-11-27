import { useState } from "react";
import { Wifi, WifiOff, Bluetooth, BluetoothOff, Robot } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);

  const handleWifiChange = (checked: boolean) => {
    setIsWifiEnabled(checked);
    toast.info(`WiFi ${checked ? 'enabled' : 'disabled'}`);
    console.log("WiFi mode changed:", checked);
  };

  const handleBluetoothChange = (checked: boolean) => {
    setIsBluetoothEnabled(checked);
    toast.info(`Bluetooth ${checked ? 'enabled' : 'disabled'}`);
    console.log("Bluetooth mode changed:", checked);
  };

  return (
    <div className="glass-panel rounded-xl p-4 space-y-4 w-full sm:w-auto">
      <div className="flex items-center gap-2 mb-4">
        <Robot className="w-5 h-5 text-[#9b87f5]" />
        <h3 className="text-sm font-semibold text-[#7E69AB]">Robot Car Connection</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
            <Switch
              checked={isWifiEnabled}
              onCheckedChange={handleWifiChange}
              className="data-[state=checked]:bg-[#9b87f5]"
            />
            <span className="text-sm font-medium flex items-center gap-1">
              <Wifi className={`w-4 h-4 ${isWifiEnabled ? 'text-[#9b87f5]' : 'text-muted-foreground'}`} />
              WiFi
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg">
            <Switch
              checked={isBluetoothEnabled}
              onCheckedChange={handleBluetoothChange}
              className="data-[state=checked]:bg-[#9b87f5]"
            />
            <span className="text-sm font-medium flex items-center gap-1">
              <Bluetooth className={`w-4 h-4 ${isBluetoothEnabled ? 'text-[#9b87f5]' : 'text-muted-foreground'}`} />
              Bluetooth
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 shadow-sm border border-[#9b87f5]/20">
          {isConnected ? (
            <>
              {isWifiEnabled && <Wifi className="w-4 h-4 text-[#9b87f5]" />}
              {isBluetoothEnabled && <Bluetooth className="w-4 h-4 text-[#9b87f5]" />}
              <span className="text-sm font-medium text-[#9b87f5]">Connected</span>
            </>
          ) : (
            <>
              {isWifiEnabled && <WifiOff className="w-4 h-4 text-car-error" />}
              {isBluetoothEnabled && <BluetoothOff className="w-4 h-4 text-car-error" />}
              <span className="text-sm font-medium text-car-error">Disconnected</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};