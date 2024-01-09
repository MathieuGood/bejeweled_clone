import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import SettingsScreen from './screens/SettingsScreen'
import ScoresScreen from './screens/ScoresScreen'


const Stack = createNativeStackNavigator()


export default function App() {
  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'Welcome !' }} />
        <Stack.Screen name='RegisterrScreen' component={HomeScreen} options={{ title: 'Register' }} />
        <Stack.Screen name='PlayerScreen' component={HomeScreen} options={{ title: 'Player' }} />
        <Stack.Screen name='GameScreen' component={GameScreen} />
        <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
        <Stack.Screen name='ScoresScreen' component={ScoresScreen} />


      </Stack.Navigator>

    </NavigationContainer>

  );
}
