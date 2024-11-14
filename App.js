import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavegacaoApp from './navegacao/NavegacaoApp';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavegacaoApp />
    </GestureHandlerRootView>
  );
}