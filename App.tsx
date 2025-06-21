/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/naviagtion/AppNavigator';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
        <AppNavigator />
        </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

