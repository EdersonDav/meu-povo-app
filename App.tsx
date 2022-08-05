import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider} from 'native-base'
import { Provider } from 'react-redux';

import { Home } from './src/views/Home'
import { store } from './src/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar backgroundColor="transparent" translucent />
        <Home/>
      </NativeBaseProvider>
    </Provider>
  );
}
