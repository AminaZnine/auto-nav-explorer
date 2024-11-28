import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Wifi, WifiOff, Bluetooth, BluetoothOff, Bot } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const { showToast } = useToast();

  const handleWifiChange = () => {
    setIsWifiEnabled(!isWifiEnabled);
    showToast(`WiFi ${!isWifiEnabled ? 'enabled' : 'disabled'}`, "info");
    console.log("WiFi mode changed:", !isWifiEnabled);
  };

  const handleBluetoothChange = () => {
    setIsBluetoothEnabled(!isBluetoothEnabled);
    showToast(`Bluetooth ${!isBluetoothEnabled ? 'enabled' : 'disabled'}`, "info");
    console.log("Bluetooth mode changed:", !isBluetoothEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bot size={20} color="#9b87f5" />
        <Text style={styles.title}>Robot Car Connection</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleWifiChange}
          >
            <View style={styles.buttonContent}>
              {isWifiEnabled ? (
                <Wifi size={16} color="#9b87f5" />
              ) : (
                <WifiOff size={16} color="#666" />
              )}
              <Text style={[styles.buttonText, isWifiEnabled && styles.buttonTextActive]}>
                WiFi
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleBluetoothChange}
          >
            <View style={styles.buttonContent}>
              {isBluetoothEnabled ? (
                <Bluetooth size={16} color="#9b87f5" />
              ) : (
                <BluetoothOff size={16} color="#666" />
              )}
              <Text style={[styles.buttonText, isBluetoothEnabled && styles.buttonTextActive]}>
                Bluetooth
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.status, isConnected ? styles.connected : styles.disconnected]}>
          {isWifiEnabled && (
            isConnected ? <Wifi size={16} color="#9b87f5" /> : <WifiOff size={16} color="#F44336" />
          )}
          {isBluetoothEnabled && (
            isConnected ? <Bluetooth size={16} color="#9b87f5" /> : <BluetoothOff size={16} color="#F44336" />
          )}
          <Text style={[styles.statusText, isConnected ? styles.connectedText : styles.disconnectedText]}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7E69AB',
  },
  controls: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  buttonTextActive: {
    color: '#9b87f5',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
  },
  connected: {
    borderColor: 'rgba(155, 135, 245, 0.2)',
  },
  disconnected: {
    borderColor: 'rgba(244, 67, 54, 0.2)',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  connectedText: {
    color: '#9b87f5',
  },
  disconnectedText: {
    color: '#F44336',
  },
});