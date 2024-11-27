import { Wifi, WifiOff, Bluetooth, BluetoothOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  const [isWifiMode, setIsWifiMode] = React.useState(true);

  const handleModeChange = (checked: boolean) => {
    setIsWifiMode(checked);
    toast.info(`Switched to ${checked ? 'WiFi' : 'Bluetooth'} mode`);
    console.log("Connection mode changed:", checked ? "WiFi" : "Bluetooth");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch
          checked={isWifiMode}
          onCheckedChange={handleModeChange}
          className="data-[state=checked]:bg-car-success"
        />
        <span className="text-sm font-medium">
          {isWifiMode ? "WiFi" : "Bluetooth"}
        </span>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 shadow-sm">
        {isConnected ? (
          <>
            {isWifiMode ? (
              <Wifi className="w-4 h-4 text-car-success" />
            ) : (
              <Bluetooth className="w-4 h-4 text-car-success" />
            )}
            <span className="text-sm font-medium text-car-success">Connected</span>
          </>
        ) : (
          <>
            {isWifiMode ? (
              <WifiOff className="w-4 h-4 text-car-error" />
            ) : (
              <BluetoothOff className="w-4 h-4 text-car-error" />
            )}
            <span className="text-sm font-medium text-car-error">Disconnected</span>
          </>
        )}
      </div>
    </div>
  );
};