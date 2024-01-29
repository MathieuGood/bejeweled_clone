import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import SettingsScreen from './screens/SettingsScreen'
import ScoresScreen from './screens/ScoresScreen'
import RegisterScreen from './screens/RegisterScreen'
import PlayerScreen from './screens/PlayerScreen'


const Stack = createNativeStackNavigator()


export default function App() {
  return (

    <NavigationContainer>

      <Stack.Navigator>

        {/* <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name='PlayerScreen' component={PlayerScreen} options={{ headerShown: false }} />
        <Stack.Screen name='GameScreen' component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SettingsScreen' component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name='ScoresScreen' component={ScoresScreen} options={{ headerShown: false }} />


      </Stack.Navigator>

    </NavigationContainer>

  );
}
