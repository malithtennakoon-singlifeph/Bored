import 'react-native-gesture-handler';
import React, {useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/Navigation';

export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex:1}}>
        <Navigation/>
        <Toast/>
      </SafeAreaView>
    </NavigationContainer>
  )
}
