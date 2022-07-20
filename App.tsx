import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from '@use-expo/font';


import { Home } from './src/views/Home'
import { NativeBaseProvider } from 'native-base'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
