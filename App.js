import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Navigation from './src/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex:1}}>
        <Navigation/>
        <Toast/>
      </SafeAreaView>
    </NavigationContainer>
  )
}
