import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginLayout from './routes/LoginLayout';
import UserRegistration from './routes/UserRegistration';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Journal from './routes/Journal';
import Welcome from './routes/Welcome';
import Home from './routes/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Registration" component={UserRegistration} />
    <Stack.Screen name="Login" component={LoginLayout} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Journal" component={Journal} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
