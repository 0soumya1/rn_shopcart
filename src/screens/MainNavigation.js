import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();
const MainNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigation;
