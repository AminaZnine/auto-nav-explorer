import React, { createContext, useContext, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type ToastActionElement = React.ReactElement;

export const Toast: React.FC<ToastProps> = ({ title, description }) => (
  <View style={styles.toast}>
    {title && <Text style={styles.title}>{title}</Text>}
    {description && <Text style={styles.description}>{description}</Text>}
  </View>
);

export const ToastTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

export const ToastDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
);

export const ToastClose: React.FC = () => (
  <View style={styles.closeButton} />
);

export const ToastViewport: React.FC = () => (
  <View style={styles.viewport} />
);

type ToastContextType = {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const showToast = (msg: string, toastType: 'success' | 'error' | 'info' = 'info') => {
    setMessage(msg);
    setType(toastType);
    setVisible(true);
    
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
          <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toast: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    width: 24,
    height: 24,
  },
  viewport: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  toastContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
  },
});