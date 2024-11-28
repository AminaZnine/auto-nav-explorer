import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import { ToastProvider } from './components/ui/toast';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <ToastProvider>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={Index}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </ToastProvider>
    </NavigationContainer>
  </QueryClientProvider>
);

export default App;