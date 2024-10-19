import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainNavigation from './screens/MainNavigation';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Addresses from './screens/Addresses';
import AddAddress from './screens/AddAddress';
import OrderSuccess from './screens/OrderSuccess';
import Orders from './screens/Orders';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PACPage from './screens/PACPage';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
          <Stack.Screen name="MainNavigation" component={MainNavigation} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Addresses" component={Addresses} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="PACPage" component={PACPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigation;
