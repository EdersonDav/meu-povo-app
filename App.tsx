import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';
import { NativeBaseProvider} from 'native-base'

import { Home } from './src/views/Home'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Ubuntu-Bold': require('./assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
    'Ubuntu-Regular': require('./assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
  });

  return (
      <NativeBaseProvider>
        <StatusBar backgroundColor="transparent" translucent />
        <Home/>
      </NativeBaseProvider>
  );
}
