import { Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 shadow-sm">
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4 text-car-success" />
          <span className="text-sm font-medium text-car-success">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-car-error" />
          <span className="text-sm font-medium text-car-error">Disconnected</span>
        </>
      )}
    </div>
  );
};