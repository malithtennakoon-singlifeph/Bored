import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Bored from '../Screens/Bored';
import GuessCountry from '../Screens/GuessCountry';
import Universities from '../Screens/Universities';
import CatFacts from '../Screens/CatFacts';
import GuessAge from '../Screens/GuessAge';
import GuessGender from '../Screens/GuessGender';
import IPInfo from '../Screens/IPInfo';
import DogPics from '../Screens/DogPics';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerActiveTintColor:"black",
      drawerActiveBackgroundColor:'white',
      drawerInactiveTintColor:'gray',
      drawerStyle: {
        backgroundColor: 'black',
      },
    }}>
        <Drawer.Screen name="Bored" component={Bored} options= {{title:'Bored'}} />
        <Drawer.Screen name="GuessCountry" component={GuessCountry} options= {{title:'Guess My Country'}}/>
        <Drawer.Screen name="Universities" component={Universities} options= {{title:'University List'}}/>
        <Drawer.Screen name="CatFacts" component={CatFacts} options= {{title:'Cat Facts'}}/>
        <Drawer.Screen name="GuessAge" component={GuessAge} options= {{title:'Guess My Age'}}/>
        <Drawer.Screen name="GuessGender" component={GuessGender} options= {{title:'Guess My Gender'}}/>
        <Drawer.Screen name="IPInfo" component={IPInfo} options= {{title:'IP Information'}}/>
        <Drawer.Screen name="DogPics" component={DogPics} options= {{title:'Dog Picture'}}/>
    </Drawer.Navigator>
  )
}
