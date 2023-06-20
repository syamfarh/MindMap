import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginLayout from './routes/LoginLayout';
import UserRegistration from './routes/UserRegistration';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Journal from './routes/Journal';
import Welcome from './routes/Welcome';
import Home from './routes/Home';
import React, { useState, useEffect } from 'react';
import { auth } from "./firebase-setup";
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
          if (user) {
              setIsAuthenticated(true);
          } else {
              setIsAuthenticated(false);
          }
      });
  },[]);

  const AuthPages = (
    <>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Registration" component={UserRegistration} />
      <Stack.Screen name="Login" component={LoginLayout} />
    </>
  )

  const LoggedPage = (
    <>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Journal" component={Journal} />
    </>
  )
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? LoggedPage : AuthPages}
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
