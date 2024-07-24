import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
      getData();
  }, []);

  const getData = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    console.log("email------------", email)

    setTimeout(()=>{
      if (email != '' && email != null) {
        // navigation.navigate('LoginScreen');
        navigation.replace('MainNavigation');
      } else {
        navigation.replace('LoginScreen');
      }
    }, 3000)
   
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/shop_cart_logo.jpg')}
        style={styles.logo}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
