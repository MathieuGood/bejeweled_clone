import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import GameScreen from './screens/GameScreen'
import HomeScreen from './screens/HomeScreen'
import SplashScreen from './screens/SplashScreen'
import ThemePreloader from './components/preloaderComponent/ThemesPreloader'
import FontLoader from './components/preloaderComponent/FontLoader'
import { AppProvider } from './providers/AppContext'


const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <AppProvider>
        <ThemePreloader />
         <FontLoader/>
        
           <NavigationContainer>

            <Stack.Navigator>
              {Platform.OS === 'ios' && (
                <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
              )}
              <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name='GameScreen' component={GameScreen} options={{ headerShown: false }} />
            </Stack.Navigator>

          </NavigationContainer>
    </AppProvider>

  );
}
