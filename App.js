import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import GameScreen from './screens/GameScreen'
import SettingsScreen from './screens/SettingsScreen'
import HomeScreen from './screens/HomeScreen'
import SplashScreen from './screens/SplashScreen';
import ThemePreloader from './components/preloaderComponent/ThemesPreloader'
import { AppProvider } from './providers/AppContext'


const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <AppProvider>
        <ThemePreloader />
        
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='GameScreen' component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SettingsScreen' component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>

    </AppProvider>

  );
}
