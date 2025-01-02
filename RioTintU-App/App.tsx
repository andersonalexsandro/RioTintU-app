import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Home } from './src/pages/Home';
import { CPUProvider } from './src/context/CpuContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CPUProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                  name="Home" 
                  component={Home} 
                  options={{ headerShown: false }} 
                />
            </Stack.Navigator>
          <StatusBar style="auto" />
       </NavigationContainer>
    </CPUProvider>
  );
}