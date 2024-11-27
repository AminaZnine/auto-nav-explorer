import { useState } from "react";
import { Wifi, WifiOff, Bluetooth, BluetoothOff } from "lucide-react";
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
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={isWifiEnabled}
            onCheckedChange={handleWifiChange}
            className="data-[state=checked]:bg-car-success"
          />
          <span className="text-sm font-medium flex items-center gap-1">
            <Wifi className={`w-4 h-4 ${isWifiEnabled ? 'text-car-success' : 'text-muted-foreground'}`} />
            WiFi
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={isBluetoothEnabled}
            onCheckedChange={handleBluetoothChange}
            className="data-[state=checked]:bg-car-success"
          />
          <span className="text-sm font-medium flex items-center gap-1">
            <Bluetooth className={`w-4 h-4 ${isBluetoothEnabled ? 'text-car-success' : 'text-muted-foreground'}`} />
            Bluetooth
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 shadow-sm">
        {isConnected ? (
          <>
            {isWifiEnabled && <Wifi className="w-4 h-4 text-car-success" />}
            {isBluetoothEnabled && <Bluetooth className="w-4 h-4 text-car-success" />}
            <span className="text-sm font-medium text-car-success">Connected</span>
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
  );
};