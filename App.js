import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import SettingsScreen from './screens/SettingsScreen'
import ScoresScreen from './screens/ScoresScreen'

import Store from './store/configStore'
import { Provider } from 'react-redux'


const Stack = createNativeStackNavigator()


export default function App() {
  return (

    <Provider store={Store}>

      <NavigationContainer>

        <Stack.Navigator>

          <Stack.Screen name='HomeScreen' component={HomeScreen} />
          <Stack.Screen name='GameScreen' component={GameScreen} />
          <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
          <Stack.Screen name='ScoresScreen' component={ScoresScreen} />


        </Stack.Navigator>

      </NavigationContainer>

    </Provider>
  );
}
